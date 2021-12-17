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
    console.log(productsSaveInLocalStorage);
    //If the cart is empty : Display empty cart
    if(productsSaveInLocalStorage.length === 0){
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
  // function to delete the element from the local storage
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
    //Getting cart's informations
    let calculateTotalPrice = productsSaveInLocalStorage.map(p=>p.itemPrice*p.itemQuantity) || [0];
   
    //adding prices from the array to the reduce method
    const reducerPrice = (accumulator, currentValue)=> accumulator + currentValue;
    const totalPrice = calculateTotalPrice.reduce(reducerPrice);
    return totalPrice;
}


//Total Quantity
function getTotalQuantity(){
    //Getting cart's informations
    let calculateTotalQuantity = productsSaveInLocalStorage.map(p=>p.itemQuantity) || [0];

    //adding prices from the array to the reduce method
    const reducerQuantity = (accumulator, currentValue)=> accumulator + currentValue;
    const totalQuantity = calculateTotalQuantity.reduce(reducerQuantity);
    return totalQuantity;
}
//integration in HTML


function renderTotalCart(){
    const totalPrice = getTotalPrice();
    const quantityValue = getTotalQuantity();
    document.querySelector('.cart__price').innerHTML +=
    `  <p>Total (<span id="totalQuantity">${quantityValue}</span> articles) : <span id="totalPrice">${totalPrice || 0}</span> €</p>
    `;
}
renderTotalCart();

// Select Product Id into an array to use the splice method
/*
let getCartProductsId = [];
for (let n = 0; n < productsSaveInLocalStorage.length; n++){
    let cartProductsId =productsSaveInLocalStorage[n].selectedItemId;
    //adding cart's prices into the variable  
    getCartProductsId.push(cartProductsId);

    console.log(getCartProductsId);
}
*/

const inputChanges = document.querySelector('.itemQuantity');
/*getData(event) {
    console.log(+JSON.stringify(event.target.dataset));
    console.log(+JSON.stringify(event.target.dataset.id));
}

inputChanges.addEventListener('change', function(){
   console.log("CHANGE");
  
});*/


// use the splice method on it here
/*
const removeCartItem = (arr, item) => {
    let newArray = [...arr];
    const index = newArray.findIndex((element) => element === item);
    if (index !== -1) {
        newArray.splice(index, 1);
        return newArray;
    }
    console.log(removeCartItem(getCartProductsId, '107fb5b75607497b96722bda5b504926'));
    console.log(getCartProductsId);
}*/