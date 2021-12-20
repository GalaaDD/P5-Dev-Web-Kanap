let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];

function renderOrderNumber() {
    document.querySelector("#orderId").innertext +=
      localStorage.getItem("orderId");        
}