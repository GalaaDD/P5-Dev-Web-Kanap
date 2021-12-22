
/**Get-API-product-Informations */

function getProducts() {
   return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json();
        })
        .then(function (products) {
            return products;
          })
          
        .catch((error) => { 
            let items = document.querySelector(".items");
            items.innerHTML = 
            "Une erreur est survenue, veuillez vérifier le port du serveur local <br> Si le problème persiste veuillez nous en informer.";
        });
}

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

async function displayProducts() {
    const products = await getProducts();
    console.log(products);
    if (products && products.length) {
        for(const product of products){
            renderProduct(product);
        }
    }

}

displayProducts();



