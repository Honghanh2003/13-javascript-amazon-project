import { renderOrdersummary } from "./checkout/ordersummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js'
//import '../data/cart-class.js';

async function loadPage(){
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

  renderOrdersummary();
  renderPaymentSummary();

  return 'value2';
}
loadPage();
/*
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
})*/

//script/checkout/ordersummary.js