import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './isWeekend.js';
const today = dayjs();
console.log(today.add(1, 'month').format('MMMM, D'));
console.log(today.subtract( 1, 'month').format('MMMM, D'));

console.log(today.format('dddd'));

console.log(isSatSun(1, 'month'));
console.log(isSatSun(8, 'month'));

