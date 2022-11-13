function setTheme() {
  var theme = localStorage.getItem("theme");
  console.log(theme);
  document.getElementsByTagName("body")[0].classList.add(theme);
}

setTheme();
