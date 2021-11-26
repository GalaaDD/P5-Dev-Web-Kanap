const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', productRoutes);

module.exports = app;


/**reflexion

*let url = 
*'./product.html?id=42';

*fetch(url).then((response) =>
  response.json().then((data) => console.log(data))
*);
*let article-template = '<article>'
*for(let product of data){
  article-template += `<`
*}
*let article-template = ``
*********