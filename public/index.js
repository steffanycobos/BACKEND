const socket = io();

socket.on("product-list", (data) => {
  const productList = document.getElementById("updated-products");
  productList.innerHTML = JSON.stringify(data);
});
