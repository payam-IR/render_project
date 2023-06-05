document.getElementById("logout").addEventListener("click", (obj) => {
  const result = window.confirm("are you sure?");
  if (result) {
    return true;
  } else {
    return false;
  }
});
