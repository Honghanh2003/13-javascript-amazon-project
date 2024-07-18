import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  // Function to update cart quantity display
  function updateCartQuantity() {
    const cartQuantity = cart.reduce((total, { quantity }) => total + quantity, 0);

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
  }

  // Calculate initial cart quantity
  let cartQuantity = cart.reduce((total, { quantity }) => total + quantity, 0);

  // Update the cart quantity display on load
  if (cartQuantity > 0) {
    updateCartQuantity();
  } else {
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = '';
    }
  }

  // Iterate through products to build the HTML
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStartUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container js-product-quantity-container">
          <select class="js-quantity-select" data-select-id="${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart" data-message-id="${product.id}">
          <img src="images/icons/checkmark.png">
          Đã thêm
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Thêm vào giỏ hàng
        </button>
      </div>
    `;
  });

  // Inject the product HTML into the products grid container
  const productsGridElement = document.querySelector('.js-products-grid');
  if (productsGridElement) {
    productsGridElement.innerHTML = productsHTML;
  }

  // Initialize addedMessageTimeouts outside of event listeners to avoid global scope issues
  const addedMessageTimeouts = {};

  // Attach event listeners to add-to-cart buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.added-to-cart[data-message-id="${productId}"]`);

      if (addedMessage) {
        addedMessage.classList.add('new-class');

        // Clear existing timeout for this productId if any
        if (addedMessageTimeouts[productId]) {
          clearTimeout(addedMessageTimeouts[productId]);
        }

        // Set a timeout to remove the "Added" message
        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('new-class');
        }, 2000);

        // Store the timeout ID to clear it later if necessary
        addedMessageTimeouts[productId] = timeoutId;
      }
    });
  });
}
