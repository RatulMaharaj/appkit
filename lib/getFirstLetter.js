export default function getFirstLetters(str) {
  if (str === undefined) {
    return "";
  }
  const firstLetters = str
    .split(" ")
    .map((word) => word[0])
    .join("");

  return firstLetters;
}
