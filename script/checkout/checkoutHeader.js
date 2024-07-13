import { updateCartQuantity } from '../../data/cart.js';

export function renderCheckoutHeader(){
  const checkoutheaderHTML =`
  Checkout (<a class="return-to-home-link"
    href="amazon.html">${updateCartQuantity()} Items</a>)
  `
  document.querySelector('.js-header-middle').innerHTML= checkoutheaderHTML;
}