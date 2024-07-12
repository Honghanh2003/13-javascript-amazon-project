import {addToCart} from '../../data/cart.js';

describe(('test suite: addToCart', () =>{
  it('adds a new product to the cart', ()=>{
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  })
}))