let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];

/*
function renderOrderNumber() {
    document.querySelector("#orderId").innertext +=
      localStorage.getItem("orderId");        
}*/

function renderOrderNumber(){
  const OrderNumberid = document.getElementById("orderId");
  OrderNumberid.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"))
  localStorage.clear();
}

renderOrderNumber();