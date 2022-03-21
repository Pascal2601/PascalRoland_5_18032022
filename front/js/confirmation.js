const idSearchParams = new URLSearchParams(location.search);
const idOrder = idSearchParams.get('orderId');

const orderId = document.getElementById('orderId');
orderId.innerHTML = `</br></br>${idOrder}`;

removeAllCache();
function removeAllCache() {
  const cache = window.localStorage;
  cache.clear();
}
