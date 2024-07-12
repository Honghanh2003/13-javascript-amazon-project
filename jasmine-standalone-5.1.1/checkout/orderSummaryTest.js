import { renderOrdersummary } from "../../script/checkout/ordersummary.js";
import { loadFromStorage } from '../../data/cart.js';


describe('test suit: renderOrderSummary', ()=>{
  it('display the cart', ()=>{
    document.querySelector('.js-test-container').innerHTML=`
    <div class="js-order-summary"></div>
    `;

   
        spyOn(localStorage, 'setItem');
    
        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }]);
        });
        loadFromStorage();
    
        renderOrdersummary();

        document.querySelector('')//check lại các test 
        
      });
});
