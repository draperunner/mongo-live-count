function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setInterval(function () {
  fetch('/count')
    .then((res) => res.json())
    .then((parsedResponse) => {
      document.getElementById("count").innerHTML = numberWithCommas(parsedResponse.count);
      document.getElementById("storage-size").innerHTML = "That's " + parsedResponse.storageSize;
    })
  }, 1000);
