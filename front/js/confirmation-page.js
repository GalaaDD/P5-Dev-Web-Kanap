let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];
//Function to display Order Number in HTML
function renderOrderNumber(){
  const OrderNumberId = document.getElementById("orderId");
  OrderNumberId.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.clear();
}

renderOrderNumber();