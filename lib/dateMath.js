export const calcDateDiff = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.abs(diff / (1000 * 60 * 60));
  const minutes = Math.abs(diff / (1000 * 60));
  const seconds = Math.abs(diff / 1000);
  return { hours, minutes, seconds };
};

export function nextDateThatIsA(dayIndex, date = null) {
  let today;
  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }
  today.setDate(
    today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1
  );
  return today;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
