const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/order', productCtrl.orderProducts);

module.exports = router;












/* ANCIENNE PARTIE
// Creation of new Reg Exp for validations
let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

 /*******Form validation functions******/
/*
 //FirstName Validation
const validFirstName = function(inputFirstName) {
    let firstNameErrorMessage = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMessage.innerHTML = '';
        return true;
    } else {
        firstNameErrorMessage.innerHTML = 'Veuillez renseigner votre prénom.';
        return false;
    }
};

//LastName validation
const validLastName = function(inputLastName) {
    let lastNameErrorMessage = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMessage.innerHTML = '';
        return true;
    } else {
        lastNameErrorMessage.innerHTML = 'Veuillez renseigner votre nom de famille.';
        return false;
    }
};

//Adress validation
const validAddress = function(inputAddress) {
    let addressErrorMessage = inputAddress.nextElementSibling;

    if ((inputAddress.value)) {
        addressErrorMessage.innerHTML = '';
        return true; 
    } else {
        addressErrorMessage.innerHTML = 'Veuillez renseigner votre adresse postale.';
        return false;
    }
};

//City validation
const validCity = function(inputCity) {
    let cityErrorMessage = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMessage.innerHTML = '';
        return true;
    } else {
        cityErrorMessage.innerHTML = 'Veuillez renseigner le nom de votre ville.';
        return false;
    }
};

//Email validation
const validEmail = function(inputEmail) {
    let emailErrorMessage = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMessage.innerHTML = '';
        return true;
    } else {
        emailErrorMessage.innerHTML = 'Veuillez renseigner votre adresse email.';
        return false;
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
    // Listening the input to call the function when the change is happening
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
        //Function have this(here form.firstname) as a parameter
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
*/



/******************************************************** ANCIENNE PARTIE**************************************************
//Function to Send Guests'information to the localstorage
async function postFormToTheLocalStorage(){
    const orderBtn = document.getElementById("order");
    let form = document.querySelector(".cart__order__form");
    //cart Listener 
    orderBtn.addEventListener("click", (event) => {
        if (controlForm(form)!== true) return false;
        //Getting Guest informations
        const inputName = document.getElementById('firstName');
        const inputLastName = document.getElementById('lastName');
        const inputAdress = document.getElementById('address');
        const inputCity = document.getElementById('city');
        const inputMail = document.getElementById('email');

        const selectedItemsId = productsSaveInLocalStorage.map(p => p.selectedItemId);

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
            headers: {
                "Content-Type": "application/json" 
            },
        };

        // Fetch the local storage to send informations
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

postFormToTheLocalStorage();*/