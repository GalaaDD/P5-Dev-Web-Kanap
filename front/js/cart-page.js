

const cartProducts = document.querySelector("#cart__items");
let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'));
//If the cart is empty : Display empty cart

if(productsSaveInLocalStorage === null){
const emptyCart = `
    <div class="empty-Cart">
    <div>Le panier est vide</div>
    </div>
    `;
    cartProducts.innerHTML = emptyCart;
}else{
    //If the cart is not empty: Display Products
    let cartStructure = [];
    
    for(i = 0; i < productsSaveInLocalStorage.length; i++){ 
        console.log(productsSaveInLocalStorage);
       cartStructure = cartStructure + `
        <article class="cart__item" data-id="${productsSaveInLocalStorage[i].selectedItemId}" data-color="${productsSaveInLocalStorage[i].itemColor}">
            <div class="cart__item__img">
                <img src="${productsSaveInLocalStorage[i].itemImage}" alt="${productsSaveInLocalStorage[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productsSaveInLocalStorage[i].itemName}</h2>
                    <p>${productsSaveInLocalStorage[i].itemColor}</p>
                    <p>${productsSaveInLocalStorage[i].itemPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${productsSaveInLocalStorage[i].itemQuantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsSaveInLocalStorage[i].itemprice}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `;
    }
        if(i == productsSaveInLocalStorage.length){
                cartProducts.innerHTML = cartStructure;
                            // HTML Integration
        }
   
                
}
