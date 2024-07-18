import { renderOrdersummary } from "./checkout/ordersummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js'
//import '../data/cart-class.js';

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })

]).then((values) => {
  console.log(values);
  renderOrdersummary();
  renderPaymentSummary();
})

//script/checkout/ordersummary.js