const socket = io();

const productList = document.getElementById("updated-products");
socket.on("product-list", (data) => {
  productList.innerHTML = JSON.stringify(data);
});
