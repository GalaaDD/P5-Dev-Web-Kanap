
const product = {};
(async function() {
    const productId = getProductId();
    Object.assign(product, await getProduct(productId));
    renderProduct(product);
})()
function getProductId() {
    return new URL(location.href).searchParams.get("id");
}

function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (products) {
            return products;
        })
        .catch(() => { 
            let items = document.querySelector(".items");
            items.innerHTML = 
            "Une erreur est survenue, veuillez vérifier le port du serveur local <br> Si le problème persiste veuillez nous en informer.";
        });  
}

// Function to display the color's options of the products
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

/**local-storage */
//Get cutstomer's choice-Quantity-informations'
function getItemInformations(product){
    /**cutstomer's choice-Quantity /colors*/
    const itemQuantityChoice = document.querySelector("#quantity").value;
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
    
    if ( window.confirm(`${ item.itemName} ${item.itemColor} a été ajouté au panier cliquez sur OK pour acceder panier ou sur ANNULER pour retourner à l'accueil`)){
        checkStorage(item);
        window.location.href = "cart.html";
    }
    else{
        window.location.href = "index.html";
    }
}

// storage check
function checkStorage(itemInformations){
    productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product')) || []; 
    console.log(productsSaveInLocalStorage);
    const productIndex = productsSaveInLocalStorage.findIndex(p => p.selectedItemId === itemInformations.selectedItemId && p.itemColor === itemInformations.itemColor);
    if (productIndex !== -1) {
        productsSaveInLocalStorage[productIndex].itemQuantity++;
    } else {
        productsSaveInLocalStorage.push(itemInformations);
        localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
    } 
}

function addToCartBtn(){
    document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();
    const itemInformations = getItemInformations(product);
    console.log(itemInformations);
    alertConfirmation(itemInformations);
    });
}

addToCartBtn();

//addEventListener-AddToCart


/**local storage- part*/
/** 
 * productsSaveInLocalStorage.push(itemInformations);
    //transform and Send to the 'product'key of the local Storage, in the JSON language
    localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));

//Function to add selected product to the local storage
function addSelectedProductToTheLocalStorage() {
    let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'));
    const productId = getProductId();
    const product = getProduct(productId);
    /**Get cutstomer's choice-Quantity-informations'
    const itemInformations = { 
        itemName : product.name,
        selectedItemId: product._id,
        itemColor: itemColorChoice,
        itemQuantity: itemQuantityChoice,
        itemPrice: product.price,
        itemImage: product.imageUrl,
        itemImageDescription: product.altTxt,
    };
    
    const productIndex = productsSaveInLocalStorage.findIndex(p => p.selectedItemId === itemInformations.selectedItemId && p.itemColor === itemInformations.itemColor);

    if (productIndex !== -1) {
        productsSaveInLocalStorage[productIndex].itemQuantity++;
    }

    else {
        productsSaveInLocalStorage.push(itemInformations);
        //transform and Send to the 'product'key of the local Storage, in the JSON language
        localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
    }
        // storage check
    if (productsSaveInLocalStorage) {
        alertConfirmation();
        productsSaveInLocalStorage.push(itemInformations);
            productsSaveInLocalStorage.push(itemInformations);
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
    }
       //integration of the user values by adding object to the array
    else {
        productsSaveInLocalStorage = [];
        alertConfirmation();
    }

}

 //addEventListener-AddToCart
function addToCartBtn(){
    document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();
    addSelectedProductToTheLocalStorage();
    });
}

addToCartBtn();
addSelectedProductToTheLocalStorage();
*/