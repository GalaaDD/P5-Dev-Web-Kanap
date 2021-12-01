
(async function() {
    const productId = getProductId()
    const product = await getProduct(productId)
    renderProduct(product)
})()

function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {
        return fetch(`http://localhost:3000/api/products/${productId}`)
             .then(function (res) {
                 return res.json();
             })
             .then(function (products) {
                 return products
               })
               
             .catch((error) => { 
                 let items = document.querySelector(".items");
                 items.innerHTML = 
                 "Une erreur est survenue, veuillez vérifier le port du serveur local <br> Si le problème persiste veuillez nous en informer."
             });
     
}

// Function to display the color's options of the products
function renderProduct(product) {
    document.querySelector("#page-product").innerHTML +=
    `<title>${product.name}</title>`;

    document.querySelector(".item__img").innerHTML +=
    `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

    document.querySelector(".item__content__titlePrice").innerHTML +=
    `<h1 id="title">${product.name}</h1>`;

    document.querySelector(".item__content__titlePrice").innerHTML +=
    `<p>Prix : <span id="price">${product.price}</span>€</p>`;

    document.querySelector(".item__content__description").innerHTML +=
    `<p id="description">${product.description}</p>`;

    document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map((colors => `<option value="${colors}">${colors}</option>`)));

    //addEventListener-AddToCart
    document.getElementById("addToCart").addEventListener("click", (event) => {
        event.preventDefault();
            //cutstomer's choice-Quantity /colors
        const itemQuantityChoice = document.querySelector("#quantity").value;
        const itemColorChoice =  document.querySelector("#colors").value;
  
        //Get cutstomer's choice-Quantity-informations'
        let itemInformations = { 
        itemName : product.name,
        selectedItemId: product._id,
        itemColor: itemColorChoice,
        itemQuantity: itemQuantityChoice,
        itemPrice: product.price,

    
       
    } 
    
    const alertConfirmation = () =>{
        if (window.confirm(`${product.name} ${itemColorChoice} a été ajouté au panier Voir le panier OK ou retourner à l'accueil ANNULER`)){
            window.location.href = "cart.html";
        }else{
            window.location.href = "index.html";
        }
    }
    console.log(itemInformations);


/**local storage- part*/
            
        let productsSaveInLocalStorage = JSON.parse (localStorage.getItem('product'));
        console.log(productsSaveInLocalStorage);
        
        // storage check
        if(productsSaveInLocalStorage){
            productsSaveInLocalStorage.push(itemInformations);
            productsSaveInLocalStorage.push(itemInformations);
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
            alertConfirmation();
        }else{
            productsSaveInLocalStorage = [];
            console.log(productssaveInLocalStorage);
            productsSaveInLocalStorage.push(itemInformations);
            localStorage.setItem("product", JSON.stringify(productsSaveInLocalStorage));
            alertConfirmation();
        }

        })
}