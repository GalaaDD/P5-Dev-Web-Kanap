let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'))|| [];
//Establishing through the id  where we will integrate HTML elements
const cartProducts = document.querySelector("#cart__items");

                                /************Functions to insert products information to HTML************/
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

                                /******Total Functions******/
// Function to get Total Price
function getTotalPrice(){
    //Getting cart's informations
    let calculateTotalPrice = productsSaveInLocalStorage.map(p=>p.itemPrice*p.itemQuantity) || [0];

    //adding prices from the array to the reduce method
    const reducerPrice = (accumulator, currentValue)=> accumulator + currentValue;
    const totalPrice = calculateTotalPrice.reduce(reducerPrice, 0);
    return totalPrice;
}

//Function to get Total Quantity
function getTotalQuantity(){
    //Getting cart's informations
    let calculateTotalQuantity = productsSaveInLocalStorage.map(p=>p.itemQuantity)|| [0];
    //Adding prices from the array to the reduce method
    const reducerQuantity = (accumulator, currentValue)=> accumulator + currentValue;
    const totalQuantity = calculateTotalQuantity.reduce(reducerQuantity, 0);
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
                                    /************Functions to edit Quantity input************/
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
                location.reload();
            }
        }
    });
}

//function to declare a loop to call the function initListeners
function initListeners() {
    const cartItems = document.querySelectorAll(".cart__item");
    for (let i = 0; i < cartItems.length; i++){
        const productId = cartItems[i].dataset.id;
        const productColor = cartItems[i].dataset.color;
        const quantityContainer = cartItems[i].querySelector(".itemQuantity");

        changeValue (quantityContainer, productId, productColor);
    }
}

initListeners();

/**************************************************Form Validation Functions*************************************************/
//Function to check FirstName input
function checkFirstName(contact) {
    const validFirstName = contact.firstName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
        firstNameErrorMsg.innerText = '';
        return true;
    } else {
        const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerText = 'Veuillez renseigner votre prénom.';
    }
} 
        
//Function to check LastName input
function checkLastName(contact) {
    const validName = contact.lastName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        lastNameErrorMsg.innerText = '';
        return true;
    } else {
        const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.innerText = 'Veuillez renseigner votre nom de famille.';
    }
}

//Function to check Mail Adress input
function checkMailAddress(contact) {
    const validAddress = contact.address;
    if (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(validAddress)) {
        addressErrorMsg.innerText = '';
        return true;
    } else {
        const addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.innerText = 'Veuillez renseigner votre adresse postale.';
    }
} 

//Function to check City input
function checkCity(contact) {
    const validAddress = contact.city;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
        cityErrorMsg.innerText = '';
        return true;
    } else {
        const cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.innerText = 'Veuillez renseigner le nom de votre ville.';
    }
}

//Function to check Email validation input
function checkEmail(contact) {
    const validEmail = contact.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
        emailErrorMsg.innerText = '';
        return true;
    } else {
        const emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.innerText = 'Veuillez renseigner une adresse email valide.';
    }
}
//Function to check if the storage is empty, safety to avoid orders without products
function checkStorage() {
    if (productsSaveInLocalStorage.length === 0) {
        return false;
    } else {
        return true;
    }
}

// Function to check and validate form 
function validCheck(contact) {
    if (checkFirstName(contact) && checkLastName(contact) && checkMailAddress(contact) && checkCity(contact) && checkEmail(contact)&& checkStorage()) {
        localStorage.setItem('contact', JSON.stringify(contact));
        return true;
    } else if (checkStorage() === false){
        alert("Votre panier est vide, veuillez le remplir avant de passer votre commande");
    }
    else {
        alert("Formulaire incomplet ou incorrect, merci de vérifier vos informations");
    }
}
                    /**************************POSTFORM**************************/
// Function to summary and send the information of the Order to the Local Storage
function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (e) => {
        e.preventDefault();
        
        const contact = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        };
        
        const selectedItemsId = productsSaveInLocalStorage.map(p => p.selectedItemId);
        const products = selectedItemsId;

        if (validCheck(contact)!== true) return false;

        // Constant to Summary guest's information and guest's products into an object
        const orderSummary = {
            contact,
            products,
        };

        /*******Post method******/
        // Sending the object OrderSummary to the Local Storage
        const postOrder = {
            method: 'POST',
            body: JSON.stringify(orderSummary),
            headers: {
                "Content-Type": "application/json" 
            },
        };
    
        // Fetch API to send informations
        fetch("http://localhost:3000/api/products/order", postOrder)
        .then((response) => response.json())
        .then((data) => {
            localStorage.clear();
            window.location.href = 'confirmation.html?orderId='+data.orderId;
        })
        .catch((err) => {
            alert ("Un problème est survenu: " + err.message);
        });
    });
}  

postForm();