//Function to Get-API-products-Informations with the fetch API, GET method
function getProducts() {
    // call the fetch method
   return fetch("http://localhost:3000/api/products")
        // Promise, to format 
        .then(function (res) {
            return res.json();
        })
        // Promise, return the data to use
        .then(function (products) {
            return products;
          })
          // Rejection of the request
        .catch((error) => { 
            let items = document.querySelector(".items");
            items.innerHTML = 
            "Une erreur est survenue, veuillez vérifier le port du serveur local <br> Si le problème persiste veuillez nous en informer.";
        });
}

// Function to dynamically integrate product information in HTML with innerHTML
function renderProduct(product) {
    document.querySelector("#items").innerHTML +=
    `       <a href="product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
            </a>
         `;
}

//Function to select and display products on the index page from the API information
async function displayProducts() {
    const products = await getProducts();
    if (products && products.length) {
        for(const product of products){
            renderProduct(product);
        }
    }
}

displayProducts();



