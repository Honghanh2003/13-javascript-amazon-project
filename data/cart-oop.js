function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
  
    loadFromStorage: function() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
  
      if (!this.cartItems) {
        this.cartItems = [{
          productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    saveToStorage: function() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart: function(productsId) {
      let selectQuantity = 1;
  
      const select = document.querySelector(`.js-quantity-select[data-select-id="${productsId}"]`);
      if (select) {
        selectQuantity = parseInt(select.value, 10);
      }
  
      let matchingItem = this.cartItems.find(item => item.productsId === productsId);
      if (matchingItem) {
        matchingItem.quantity = selectQuantity;
      } else {
        this.cartItems.push({
          productsId: productsId,
          quantity: selectQuantity,
          deliveryOptionId: '1'
        });
      }
  
      this.saveToStorage();
      this.updateCartQuantity(); 
    },
  
    removeFromCart(productsId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productsId !== productsId);
      this.saveToStorage();
      this.updateCartQuantity(); 
    },
  
    updateCartQuantity: function() {
      let cartQuantity = 0;
      this.cartItems.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
      });
  
      const cartQuantityElement = document.querySelector('.js-cart-quantity');
      if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
      }
  
      return cartQuantity;
    },
  
    updateDeliveryOption: function(productsId, deliveryOptionId) {
      let matchingItem = this.cartItems.find(cartItem => cartItem.productsId === productsId);
      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);




