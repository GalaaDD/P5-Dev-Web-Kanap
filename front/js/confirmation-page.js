const orderId = new URL(location.href).searchParams.get("orderId");
//Function to display Order Number in HTML
function renderOrderNumber(){
  const orderNumberId = document.getElementById("orderId");
  orderNumberId.innerText = orderId;
}

renderOrderNumber();