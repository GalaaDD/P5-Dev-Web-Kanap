let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];
const cartProducts = document.querySelector("#cart__items");

function renderProductEmpty(cartProducts) {
    cartProducts.innerHTML += 
    `
    <div class="empty-Cart">
    <div>Le panier est vide</div>
    </div>
    `;
}

/*Function to render the product on the cart page*/
function renderProductFull(productsSaveInLocalStorage) {
    for(i = 0; i < productsSaveInLocalStorage.length; i++){ 
        cartProducts.innerHTML +=
        `
        <article class="cart__item" data-id="${productsSaveInLocalStorage[i].selectedItemId}" data-color="${productsSaveInLocalStorage[i].itemColor}">
            <div class="cart__item__img">
                <img src="${productsSaveInLocalStorage[i].itemImage}" alt="${productsSaveInLocalStorage[i].itemImageDescription}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productsSaveInLocalStorage[i].itemName}</h2>
                    <p>${productsSaveInLocalStorage[i].itemColor}</p>
                    <p>${productsSaveInLocalStorage[i].itemPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${productsSaveInLocalStorage[i].itemQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `;
        document.querySelector('.cart__price').innerHTML +=
        `  <p>Total (<span id="totalQuantity"><!-- 2--></span> articles) : <span id="totalPrice"><!--  0 --></span> €</p>
        `;
    }
}
/*******/ 


/****/
function renderCarts(productsSaveInLocalStorage){
    //If the cart is empty : Display empty cart
    if(productsSaveInLocalStorage === null){
        renderProductEmpty(cartProducts);
    }else{
        //If the cart is not empty: Display Products
        renderProductFull(productsSaveInLocalStorage);
    }
}

renderCarts(productsSaveInLocalStorage);

// Remove products from cart
const removeBtn = document.getElementsByClassName('deleteItem');
for (var k = 0; k < removeBtn.length; k++) {
  button = removeBtn[k]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.parentElement.parentElement.remove()
  updateCartPrice()
}
  // update total price
  function updateCartPrice() {
    const productRow = document.querySelector('.cart__items');
    var total = 0
    for (var j = 0; j < productRow.length; j += 2) {
     let cartRow = productRow[j]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity )
      
    }
    document.getElementsByClassName('total-price')[0].innerText = total
  
  document.getElementsByClassName('totalQuantity')[0].textContent = i /= 2
  }
  // end of update total price
  
  // purchase items
  const purchaseBtn = document.querySelector('#order');
  
  const closeCartModal = document.querySelector('.cart-modal');
  
  purchaseBtn.addEventListener('click', purchaseBtnClicked)
  
  function purchaseBtnClicked () {
    alert ('Merci pour votre commande');
   var cartItems = document.getElementsByClassName('cart__items')[0]
   while (cartItems.hasChildNodes()) {
     cartItems.removeChild(cartItems.firstChild)
     
   }
    updateCartPrice()
  }
  // end of purchase items*/