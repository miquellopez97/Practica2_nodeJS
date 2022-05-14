const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

var mobiles = [
    { id: 0, brand: 'OnePlus', model: "10 Pro", price: 667},
    { id: 1, brand: 'Xiaomi', model: "Redmi Note 10 5G", price: 135},
    { id: 2, brand: 'Xiaomi', model: "11T Pro", price: 399},
    { id: 3, brand: 'OnePlus', model: "Nord 2T", price: 367},
    { id: 4, brand: 'OnePlus', model: "Nord CE 2 5G", price: 249},
    { id: 5, brand: 'Xiaomi', model: "11T", price: 293},
    { id: 6, brand: 'Samsung', model: "Galaxy S21 FE 5G", price: 479}
];

app.get('/', function(req, res) {
    res.render('pages/list', {
        mobiles: mobiles
    });
});
app.get('/createview', function(req,res) {
    res.render('pages/create');
});

app.post('/create', function(req, res) {
    const id = mobiles.length;
    let brand = req.body.brand;
    let name = req.body.name;
    let price = req.body.price;
    let flag = false;

    if (brand.length > 50)
    {
        price = "";
        flag = true;
    }
    
    if( name.length > 50)
    {
        name = "";
        flag = true;
    }

    if (isNaN(price)){
        price = 0;
        flag = true;
    }

    if (flag){
        return res.render('pages/create', {
            brandValue : brand,
            nameValue : name,
            priceValue : price
        });
    }

    const newMobile = {
        id:id,
        brand:brand, 
        name:name, 
        price:price
    }

    mobiles.push(newMobile);
    
    res.redirect('/details/' + id);
});

app.get('/details/:id', function(req, res) {

    const id = req.params.id;
    
    var mobile = mobiles[id];

    res.render('pages/details', {
        mobile: mobile
    });
});

app.listen(8080);
console.log('All okeey!');