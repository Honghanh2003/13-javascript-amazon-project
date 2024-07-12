export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart =JSON.parse(localStorage.getItem('cart'));
  }

if (!cart) {
  cart = [{
    productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productsId) {
  let selectQuantity = 1;

  const select = document.querySelector(`.js-quantity-select[data-select-id="${productsId}"]`);
  if (select) {
    selectQuantity = parseInt(select.value, 10);
  }

  let matchingItem = cart.find(item => item.productsId === productsId);
  if (matchingItem) {
    matchingItem.quantity = selectQuantity;
  } else {
    cart.push({
      productsId: productsId,
      quantity: selectQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productsId) {
  cart = cart.filter(cartItem => cartItem.productsId !== productsId);

  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  return cartQuantity;
}

// Cập nhật số lượng sản phẩm trong giỏ hàng ngay khi khởi tạo
updateCartQuantity();

export function updateDeliveryOption(productsId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productsId === cartItem.productsId){
      matchingItem = cartItem;
    }
  }); 
 matchingItem.deliveryOptionId = deliveryOptionId;

 saveToStorage();
}
