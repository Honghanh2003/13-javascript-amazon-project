import { cart, addToCart } from '../data/cart.js';
import { products } from "../data/products.js";
let productsHTML= '';

// Hàm updateCartQuantity nên được định nghĩa trước khi gọi nó
function updateCartQuantity() {
  const cartQuantity = cart.reduce((total, { quantity }) => total + quantity, 0);

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

// Tính tổng số lượng sản phẩm trong giỏ hàng
let cartQuantity = cart.reduce((total, { quantity }) => total + quantity, 0);

if (cartQuantity > 0) {
  updateCartQuantity();
} else {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = '';
  }
}

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
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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

      <div class="product-spacer"></div>

      <div class="added-to-cart" data-message-id="${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-products-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Khởi tạo biến addedMessageTimeouts bên ngoài addEventListener
const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productsId } = button.dataset;

    addToCart(productsId);
    updateCartQuantity();

    const addedMessage = document.querySelector(`.added-to-cart[data-message-id="${productsId}"]`);

    if (addedMessage) {
      addedMessage.classList.add('new-class');

      if (addedMessageTimeouts[productsId]) {
        clearTimeout(addedMessageTimeouts[productsId]);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('new-class');
      }, 2000);

      addedMessageTimeouts[productsId] = timeoutId;
    }
  });
});
