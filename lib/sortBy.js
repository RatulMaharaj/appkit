export function sortByKey(array, key, order = "asc") {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (order == "asc") {
      return x < y ? -1 : x > y ? 1 : 0;
    } else if (order == "desc") {
      return x < y ? 1 : x > y ? -1 : 0;
    }
  });
}
