import { renderOrdersummary } from "./checkout/ordersummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/backend-practice.js'
//import '../data/cart-class.js';
loadProducts(() => {
  renderPaymentSummary();
  renderOrdersummary();
});

//script/checkout/ordersummary.js