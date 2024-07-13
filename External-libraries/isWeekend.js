import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();

export default function isWeekend(num, time) {
  const futureDate = dayjs().add(num, time);
  const dayIndex = futureDate.format('d'); 
  if (dayIndex === '6' || dayIndex === '0') {
    return true;
  } else {
    return false;
  }
}
