function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setInterval(function () {
  fetch('/count')
    .then(function (response) {
      return response.json();
    })
    .then(function (count) {
      document.getElementById("count").innerHTML = numberWithCommas(count);
    })
  }, 1000);
