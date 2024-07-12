import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import {formatCurrency} from '../utils/money.js'

export function renderPaymentSummary() {
  let productsPriceCents = 0;
  let shippingPriceCents = 0; 

  cart.forEach((cartItem) => {
    const products = getProduct(cartItem.productsId); 
    productsPriceCents += products.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productsPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax  + taxCents;

  const paymentSummaryHTML =`
        <div class="payment-summary">
                <div class="payment-summary-title">
                  Order Summary
                </div>

                <div class="payment-summary-row">
                  <div>Items (3):</div>
                  <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                </div>

                <button class="place-order-button button-primary">
                Place your order
                </button>

  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
