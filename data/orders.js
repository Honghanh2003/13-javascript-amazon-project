export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order){
  orders.unshift(order);
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}