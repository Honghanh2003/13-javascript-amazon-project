export let cart;

loadFromStorage();

export function loadFromStorage() {
  const storedCart = localStorage.getItem('cart');
  cart = storedCart ? JSON.parse(storedCart) : null;

  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let selectQuantity = 1;

  const select = document.querySelector(
    `.js-quantity-select[data-select-id="${productId}"]`
  );
  if (select) {
    selectQuantity = parseInt(select.value, 10);
  }

  if (isNaN(selectQuantity) || selectQuantity < 1) {
    selectQuantity = 1; // Ensure the quantity is at least 1
  }

  let matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += selectQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectQuantity,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);

  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  return cartQuantity;
}

// Update cart quantity on initialization
updateCartQuantity();

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}