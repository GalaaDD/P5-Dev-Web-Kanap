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
    for(let i = 0; i < productsSaveInLocalStorage.length; i++){ 
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
                    <p class="cart-price">${productsSaveInLocalStorage[i].itemPrice} €</p>
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

function deleteProduct(){
    const removeBtn = document.getElementsByClassName('deleteItem');
    for (let k = 0; k < removeBtn.length; k++) {
    let button = removeBtn[k];
    button.addEventListener('click', removeItem);
    }
}
function removeItem (event) {
  let btnClicked = event.target;
  btnClicked.parentElement.parentElement.parentElement.parentElement.remove();
  localStorage.removeItem("product");
}

deleteProduct();

// purchase items

  
function purchaseBtnClicked () {
    const purchaseBtn = document.querySelector('#order');
    purchaseBtn.addEventListener('click', purchaseBtnClicked);
    let cartItems = document.getElementsByClassName('cart__items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
       
    }
}

// end of purchase items*/

// total Price
function getTotalPrice(){
    let calculateTotalPrice = [];
    //Getting cart's informations
    for (let l = 0; l < productsSaveInLocalStorage.length; l++){
        let cartProductPrice =productsSaveInLocalStorage[l].itemPrice;
        //adding cart's prices into the variable  
        calculateTotalPrice.push(cartProductPrice);
        console.log(calculateTotalPrice);
    }
        //adding prices from the array to the reduce method
    const reducerPrice = (accumulator, currentValue)=> accumulator + currentValue;
    const totalPrice = calculateTotalPrice.reduce(reducerPrice, 0);
    console.log(totalPrice);
}
const totalPrice = getTotalPrice();

//Total Quantity
/*function getTotalQuantity(){*/
    let calculateTotalQuantity = [];

    //Getting cart's informations
    for (let m = 0; m < productsSaveInLocalStorage.length; m++){
        let cartProductQuantity =productsSaveInLocalStorage[m].itemQuantity;
        //adding cart's prices into the variable  
        calculateTotalQuantity.push(cartProductQuantity);

        console.log(calculateTotalQuantity);
    }

    //adding prices from the array to the reduce method
    const reducerQuantity = (accumulator, currentValue)=> accumulator + currentValue;
    const totalQuantity = calculateTotalQuantity.reduce(reducerQuantity, 0);
    
    console.log(totalQuantity.length-1);
    /*return totalQuantity;
}*/
//integration in HTML


 const quantityValue = totalQuantity.length-=1;
function renderTotalCart(){
   
    document.querySelector('.cart__price').innerHTML +=
    `  <p>Total (<span id="totalQuantity">${quantityValue}</span> articles) : <span id="totalPrice"><!-- ${totalPrice} --></span> €</p>
    `;
}
renderTotalCart();