let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];
//Establishing through the id  where we will integrate HTML elements
const cartProducts = document.querySelector("#cart__items");

//Function display the message for an empty cart
function renderProductEmpty(cartProducts) {
    cartProducts.innerHTML += 
    `
    <div class="empty-Cart">
    <div>Le panier est vide</div>
    </div>
    `;
}

//Function to integrate the products informations on the HTML cart page
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

// Function to indicate if the cart is empty
function renderCarts(productsSaveInLocalStorage){
    //If the cart is empty : Display empty cart
    if(productsSaveInLocalStorage.length === 0){
        renderProductEmpty(cartProducts);
    }else{
        //If the cart is not empty: Display Products
        renderProductFull(productsSaveInLocalStorage);
    }
}

renderCarts(productsSaveInLocalStorage);

// Function to get Total Price
function getTotalPrice(){
//Getting cart's informations
let calculateTotalPrice = productsSaveInLocalStorage.map(p=>p.itemPrice*p.itemQuantity) || [0];

//adding prices from the array to the reduce method
const reducerPrice = (accumulator, currentValue)=> accumulator + currentValue;
const totalPrice = calculateTotalPrice.reduce(reducerPrice);
return totalPrice;
}
//Function to get Total Quantity
function getTotalQuantity(){
    //Getting cart's informations
    let calculateTotalQuantity = productsSaveInLocalStorage.map(p=>p.itemQuantity)|| [0];
    //Adding prices from the array to the reduce method
    const reducerQuantity = (accumulator, currentValue)=> accumulator + currentValue;
    const totalQuantity = calculateTotalQuantity.reduce(reducerQuantity);
    return totalQuantity;
}

//Integration of the total final result in HTML
function renderTotalCart(){
    const totalPrice = getTotalPrice();
    const quantityValue = getTotalQuantity();
    document.querySelector('.cart__price').innerHTML +=
    `  <p>Total (<span id="totalQuantity">${quantityValue}</span> articles) : <span id="totalPrice">${totalPrice || 0}</span> €</p>
    `;
}

renderTotalCart();

// Function to Delete a product with the "supprimer" button
/*function deleteProducthold() {
    // selection of the input containers' class
    let deleteBtn = document.querySelectorAll(".deleteItem");
    
    for (let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener("click" , (event) => {
            event.preventDefault();
            //Select the element to delete, (id, color)
            let deleteId = productsSaveInLocalStorage[i].selectedItemId;
            let deleteColor = productsSaveInLocalStorage[i].itemColor;
            productsSaveInLocalStorage = productsSaveInLocalStorage.filter( el => el.selectedItemId !== deleteId || el.itemColor !== deleteColor );
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
            //Alert deleted product
            alert("Le produit a été supprimé du panier");
            location.reload();
        });
    }
}
deleteProducthold()
*/
/************************************** */ /************************************** */ /************************************** */ /************************************** */
// Function to Delete a product with the "supprimer" button
function deleteProduct(deleteContainers, deleteId, deleteColor) {
    deleteContainers.addEventListener("click", e => {
        e.preventDefault();
    
        let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product')) || []; 
        const productIndex = productsSaveInLocalStorage.findIndex( p => p.selectedItemId === deleteId && p.itemColor === deleteColor); 

        if (productIndex !==-1) {
            productsSaveInLocalStorage.splice(productIndex, 1);
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
            location.reload();
        }else{
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
        }
    });
}
//function to initiate delete button listeners'
function initListenersDeleteBtn() {
    const deleteContainers = document.querySelectorAll(".deleteItem");
  
    for (let i = 0; i < deleteContainers.length; i++){
        const deleteId = productsSaveInLocalStorage[i].selectedItemId;
        const deleteColor = productsSaveInLocalStorage[i].itemColor;
        deleteProduct(deleteContainers[i], deleteId, deleteColor);
    }
}

initListenersDeleteBtn();



// Function to Change Products' Quantity 
function changeValue (quantityContainer, productId, productColor){
    quantityContainer.addEventListener("change", e => {
        e.preventDefault();

        let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product')) || []; 
       
        const productIndex = productsSaveInLocalStorage.findIndex(p => p.selectedItemId === productId && p.itemColor === productColor);

        if (productIndex !==-1) {
            if (quantityContainer.valueAsNumber === 0) {
                 productsSaveInLocalStorage.splice(productIndex, 1);
                localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
                location.reload();
            }
            else{
                productsSaveInLocalStorage[productIndex].itemQuantity = quantityContainer.valueAsNumber;
                localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
            }
        }
    });
}


function initListeners() {
    const cartItems = document.querySelectorAll(".cart__item");
    for (let i = 0; i < cartItems.length; i++){
        const productId = cartItems[i].dataset.id;
        const productColor = cartItems[i].dataset.color;
        const quantityContainer = cartItems[i].querySelector(".itemQuantity");
        console.log(quantityContainer);

        changeValue (quantityContainer, productId, productColor);
    }
}

initListeners();

// Creation of new Reg Exp
let emailRegExp = new RegExp('^[a-zA-Z0-15.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

 //Form validation functions
const validFirstName = function(inputFirstName) {
    let firstNameErrorMessage = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMessage.innerHTML = '';
        return true;
    } else {
        firstNameErrorMessage.innerHTML = 'Veuillez renseigner votre prénom.';
    }
};

const validLastName = function(inputLastName) {
    let lastNameErrorMessage = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMessage.innerHTML = '';
        return true;
    } else {
        lastNameErrorMessage.innerHTML = 'Veuillez renseigner votre nom de famille.';
    }
};

const validAddress = function(inputAddress) {
    let addressErrorMessage = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMessage.innerHTML = '';
        return true; 
    } else {
        addressErrorMessage.innerHTML = 'Veuillez renseigner votre adresse postale.';
    }
};

const validCity = function(inputCity) {
    let cityErrorMessage = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMessage.innerHTML = '';
        return true;
    } else {
        cityErrorMessage.innerHTML = 'Veuillez renseigner le nom de votre ville.';
    }
};

const validEmail = function(inputEmail) {
    let emailErrorMessage = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMessage.innerHTML = '';
        return true;
    } else {
        emailErrorMessage.innerHTML = 'Veuillez renseigner votre adresse email.';
    }
};

// Function to control the validity of the input's information
function controlForm(form) {
    if (
        validFirstName(form.firstName) &&
        validLastName(form.lastName) &&
        validAddress(form.address) &&
        validCity(form.city) &&
        validEmail(form.email)
    ){
        return true;
    } else {
        alert("Formulaire incomplet ou incorrect, merci de vérifier vos informations");
        return false;
    }
}

// Function containing addEventListeners surrounding validation functions (firstname, lastname, address, city, email)
function getGuestForm() {
    let form = document.querySelector(".cart__order__form");

    form.firstName.addEventListener('change', function() {
        validFirstName(this);

    });
   
    form.lastName.addEventListener('change', function() {
        validLastName(this);

    });

    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    form.city.addEventListener('change', function() {
        validCity(this);
    });

    form.email.addEventListener('change', function() {
        validEmail(this);
    });

}

getGuestForm();



//Function to Send Guests'information to the localstorage
function postFormToTheLocalStorage(){
    const orderBtn = document.getElementById("order");
    let form = document.querySelector(".cart__order__form");
    //cart Listener 
    orderBtn.addEventListener("click", (event) => {
        if (!controlForm(form)) return;
        
        //Getting Guest informations
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        let selectedItemsId = [];
        for (let i = 0; i < productsSaveInLocalStorage.length;i++) {
            selectedItemsId.push(productsSaveInLocalStorage[i].selectedItemId);
        }

        const orderSummary = { contact : {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
            },
            products: selectedItemsId,
        };

        const postOrder = {
            method: 'POST',
            body: JSON.stringify(orderSummary),
            headers: {'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        // Fetch the local storage to send informations
        fetch("http://localhost:3000/api/products/order", postOrder)
        .then((response) => response.json())
        .then((data) => {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
            
        })

        .catch((err) => {
            alert ("Un problème est survenu: " + err.message);
        });
    });   
}

postFormToTheLocalStorage();
