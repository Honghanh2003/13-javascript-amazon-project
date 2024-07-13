
import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { updateCartQuantity } from '../../data/cart.js';
//import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate, isWeekend} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrdersummary(){
// Update cart quantity
const totalItems = updateCartQuantity();
renderCheckoutHeader();
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productsId = cartItem.productsId;

  const matchingProduct = getProduct(productsId);

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

  if (matchingProduct && deliveryOption) {
    const dateString = calculateDeliveryDate(deliveryOption);
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label" data-products-id="${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-products-id="${matchingProduct.id}">
                Update
              </span>
              <input type="number" min="0" class="quantity-input" data-products-id="${matchingProduct.id}">
              <span class="save-quantity-link js-save-link" data-products-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-products-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  }
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
      data-products-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Handle remove product from cart event
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productsId = link.dataset.productsId;
    removeFromCart(productsId);

    // Update cart quantity
    renderOrdersummary();
    renderPaymentSummary();
    renderCheckoutHeader();
    renderOrdersummary();
  });
});

// Handle update product quantity event
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productsId = link.dataset.productsId;

    const container = document.querySelector(`.js-cart-item-container-${productsId}`);
    if (container) {
      container.classList.add('is-editing-quantity');
    }
  });
});

// Handle save updated product quantity event
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productsId = link.dataset.productsId;

    const container = document.querySelector(`.js-cart-item-container-${productsId}`);
    if (container) {
      container.classList.remove('is-editing-quantity');

      const inputElement = document.querySelector(`.quantity-input[data-products-id="${productsId}"]`);
      if (inputElement) {
        const productQuantity = parseInt(inputElement.value, 10);
        const quantityLabel = document.querySelector(`.quantity-label[data-products-id="${productsId}"]`);
        if (quantityLabel) {
          quantityLabel.innerHTML = productQuantity;
        }

        updateQuantity(productsId, productQuantity);
        renderCheckoutHeader();
        renderPaymentSummary();
      }
    }
  });
});

function updateQuantity(productsId, quantity) {
  cart.forEach(cartItem => {
    if (cartItem.productsId === productsId) {
      cartItem.quantity = quantity;
    }
  });
  saveToStorage();
}

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', ()=>{
    const {productsId, deliveryOptionId} = element.dataset; 
    updateDeliveryOption(productsId, deliveryOptionId);
    renderOrdersummary();
    renderPaymentSummary();
  });
})                       
}


