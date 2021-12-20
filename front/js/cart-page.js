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

// Products Quantity Changes
function changeQuantity() {
    let quantityChanges = document.querySelectorAll(".itemQuantity");
    for (let m = 0; m < quantityChanges.length; m++){
        quantityChanges[m].addEventListener("change" , (event) => {
            event.preventDefault();

            //Select the element to change
            let quantityToChange = productsSaveInLocalStorage[m].itemQuantity;
            let quantityChangeValue = quantityChanges[m].valueAsNumber;
            const finalQuantity = productsSaveInLocalStorage.find((el) => el.quantityChangeValue !== quantityToChange);
            finalQuantity.itemQuantity = quantityChangeValue;
            productsSaveInLocalStorage[m].itemQuantity = finalQuantity.itemQuantity;

            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
        
            location.reload();
        });
    }
}
changeQuantity();

// Delete a product
function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");
    for (let n = 0; n < deleteBtn.length; n++){
        deleteBtn[n].addEventListener("click" , (event) => {
            event.preventDefault();

            //Select the element to delete, (id, color)
            let deleteId = productsSaveInLocalStorage[n].selectedItemId;
            let deleteColor = productsSaveInLocalStorage[n].itemColor;

            productsSaveInLocalStorage = productsSaveInLocalStorage.filter( el => el.selectedItemId !== deleteId || el.itemColor !== deleteColor );
            
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));

            //Alert deleted product
            alert("Le produit a été supprimé du panier");
            location.reload();
        });
    }
}
deleteProduct();


// regex formular
function getForm() {
    let form = document.querySelector(".cart__order__form");
// Creation of a new Reg Exp
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

 
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

//validation part
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const orderBtn = document.getElementById("order");

    //Listener cart
    orderBtn.addEventListener("click", (event)=>{
    
        //Getting Guest informations
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        let idProducts = [];
        for (let i = 0; i< productsSaveInLocalStorage.length;i++) {
            idProducts.push(productsSaveInLocalStorage[i].selectedItemId);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();

// purchase items

/*function purchaseBtnClicked () {
    const purchaseBtn = document.querySelector('#order');
    purchaseBtn.addEventListener('click', purchaseBtnClicked);
    let cartItems = document.getElementsByClassName('cart__items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
       
    }
}

// end of purchase items*/