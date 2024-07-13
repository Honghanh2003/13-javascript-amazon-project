import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2', 
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3', 
    deliveryDays: 1, 
    priceCents: 999 
}];

export function getDeliveryOption(deliveryOptionId) {
  let selectedOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      selectedOption = option;
    }
  });
  return selectedOption || deliveryOptions[0]; 

}

export function isWeekend(date){
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }

  export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let targetDate= dayjs();

    while(remainingDays > 0){
      targetDate = targetDate.add(1, 'day');
      if(isWeekend(targetDate)){
        continue;
      }

      remainingDays--;
    }

    const deliveryDate = targetDate.format('dddd, MMMM D');
    return deliveryDate;

  }
  