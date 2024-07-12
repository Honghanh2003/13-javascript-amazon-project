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

  return selectedOption || deliveryOptions[0]; // Sửa lỗi chính tả và tham chiếu mảng đúng
}
