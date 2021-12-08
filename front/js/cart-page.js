let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'));
const cartProducts = document.querySelector("#cart__items");



function renderProductFull(product) {
    cartProducts.innerHTML +=`
    <article class="cart__item" data-id="${productsSaveInLocalStorage.selectedItemId}" data-color="${.itemColors}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.colors}</p>
                <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.itemQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;   
}

/** fonction à réadapter pour cart-page 
 * async function displayProducts() {
    const products = await getProducts();
    console.log(products);
    if (products && products.length) {
        for(const product of products){
            renderProductFull(product);
        }
    }
}
*/


function renderProductEmpty() {
    cartProducts.innerHTML += 
    `
    <div class="empty-Cart">
    <div>Le panier est vide</div>
    </div>
    `;
}

/*function renderCartProducts(){*/
    //If the cart is empty : Display empty cart
    if(productsSaveInLocalStorage === null){
        renderProductEmpty();
    }else{
        //If the cart is not empty: Display Products
        renderProductFull();
    }
 

function editProductInformations() {
    for(i = 0; i < productsSaveInLocalStorage.length; i++){
        console.log(productsSaveInLocalStorage.length, i);
        renderProductFull();
        const deleteButton = document.querySelectorAll(".deleteItem")[i];
        console.log(deleteButton);
    }
};


