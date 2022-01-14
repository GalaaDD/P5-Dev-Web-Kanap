                /************API request************/

//Functions and constant to establish product's ID and insert it to the URL
const product = {};
(async function() {
    const productId = getProductId();
    Object.assign(product, await getProduct(productId));
    renderProduct(product);
})()

//Function containing searchParams
function getProductId() {
    return new URL(location.href).searchParams.get("id");
}

//Function to fetch the API to get the Product's Id
function getProduct(productId) {
    // call the fetch method with the variable
    return fetch(`http://localhost:3000/api/products/${productId}`)
        // Promise, to format 
        .then(function (res) {
            return res.json();
        })
        // Promise, to return the data to use
        .then(function (products) {
            return products;
        })
        // Rejection of the request
        .catch(() => { 
            let items = document.querySelector(".items");
            items.innerHTML = 
            "Une erreur est survenue, veuillez vérifier le port du serveur local <br> Si le problème persiste veuillez nous en informer.";
        });  
}

                                    /************Functions to insert products information to HTML************/

// Function to dynamically integrate product's information with innerHTML
function renderProduct(product) {
    document.querySelector("#page-product").innerHTML +=
        `<title>${product.name}</title>`;
    document.querySelector(".item__img").innerHTML +=
        `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector(".item__content__titlePrice").innerHTML +=
        `<h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>`;
    document.querySelector(".item__content__description").innerHTML +=
        `<p id="description">${product.description}</p>`;
    document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map((colors => `<option value="${colors}">${colors}</option>`))); 
}

                    /************Add to cart functions************/

//Get cutstomer's choice-Quantity-informations'
function getItemInformations(product){
    /**cutstomer's choice-Quantity /colors*/
    const itemQuantityChoice = document.querySelector("#quantity").valueAsNumber;
    const itemColorChoice =  document.querySelector("#colors").value;
    
    return { 
        itemName : product.name,
        selectedItemId: product._id,
        itemColor: itemColorChoice,
        itemQuantity: itemQuantityChoice,
        itemPrice: product.price,
        itemImage: product.imageUrl,
        itemImageDescription: product.altTxt,
    };
}    

//Function to add selected product to the local storage
function alertConfirmation(item) {
    if ( window.confirm(`${ item.itemName} ${item.itemColor} a été ajouté au panier cliquez sur OK pour confirmer et acceder au panier ou sur ANNULER pour annuler et retourner à l'accueil`)){
        checkStorage(item);
        window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }
}

// Function to declare local Storage and use of findIndex to increment or decrement quantity
function checkStorage(itemInformations){
    let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product')) || []; 
    // Incrementation using findIndex to determine if the productIndex has the same Id and the same color
    const productIndex = productsSaveInLocalStorage.findIndex(p => p.selectedItemId === itemInformations.selectedItemId && p.itemColor === itemInformations.itemColor);
    if (productIndex !== -1) {
        productsSaveInLocalStorage[productIndex].itemQuantity++;
        localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
    }else {
        productsSaveInLocalStorage.push(itemInformations);
        localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
    } 
}

// Listening the cart button to check quantity and send the selected product(s) to the cart page
function addToCartBtn(){
    document.getElementById("addToCart").addEventListener("click", (event) => {
        event.preventDefault();
        const itemInformations = getItemInformations(product);
        if (document.querySelector("#quantity").valueAsNumber !==0 ) {
            alertConfirmation(itemInformations);
        }else {
            alert("Veuillez indiquer une quantitée comprise entre 1 et 100");
        }
    });
}

addToCartBtn();