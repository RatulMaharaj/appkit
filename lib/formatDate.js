function padToTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  try {
    return [
      date.getFullYear(),
      padToTwoDigits(date.getMonth() + 1),
      padToTwoDigits(date.getDate()),
    ].join("-");
  } catch {
    return null;
  }
}

export function formatLongDate(date) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    var day = days[date.getDay()];
    var month = months[date.getMonth()];
    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  } catch {
    return null;
  }
}

export function formatMediumDate(date) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    var month = months[date.getMonth()];
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  } catch {
    return null;
  }
}


