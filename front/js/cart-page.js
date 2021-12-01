

const CartProducts = document.querySelector("#cart__items");
console.log("CartProducts");
let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'));
//If the cart is empty : Display empty cart
if(productsSaveInLocalStorage === null){
const emptyCart = `
    <div class="empty-Cart">
    <div>Le panier est vide</div>
    </div>`;
    CartProducts.innerHTML = emptyCart;

}else{
    //If the cart is not empty: Display Products
    let fullCart = [];

    for(i = 0; i < productsSaveInLocalStorage.length; i++){
        console.log(productsSaveInLocalStorage.length);
        fullCart = fullCart + `
        <article class="cart__item" data-id="${productsSaveInLocalStorage[i]._id}" data-color="${productsSaveInLocalStorage[i].colors}">
        <div class="cart__item__img">
            <img src="${productsSaveInLocalStorage[i].imageUrl}" alt="${productsSaveInLocalStorage[i].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${productsSaveInLocalStorage[i].name}</h2>
                <p>${productsSaveInLocalStorage[i].itemColorChoice}</p>
                <p>${productsSaveInLocalStorage[i].price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${productsSaveInLocalStorage[i].itemQuantityChoice}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsSaveInLocalStorage[i].price}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
        </article>`;
    }
        if(i == productsSaveInLocalStorage.length){
            CartProducts.innerHTML = fullCart;
                // HTML Integration
        }
}

// Delete-Fonctionality

//select-button-selectors-(Byclass)
let deleteButton = document.querySelectorAll(".deleteItem");
console.log(deleteButton);

for (let J = 0; 1 < deleteButton.length; J++){
    deleteButton[1].addEventListener("click", (event) =>{
    event.preventDefault();

    }
}

//select of the id that will be deleted by the button
