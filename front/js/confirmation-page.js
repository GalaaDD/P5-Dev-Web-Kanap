const orderId = new URL(location.href).searchParams.get("orderId");
//Function to display Order Number in HTML
function renderOrderNumber(){
  const OrderNumberId = document.getElementById("orderId");
  OrderNumberId.innerText = orderId;
}

renderOrderNumber();