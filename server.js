//Import ExpressJS Module
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const fs = require('fs');

const app = express()
//Made view engine ejs
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/cssFiles'))
//Made root endpoint that redirects to the login page
app.get('/', (req, res) => {
  res.redirect('login')
});

//Made menu endpoint
app.get('/menu', (req, res) => {
  res.render('menu')
});
// post menu goes to cart
app.post("/menu", (req, res) => {
  console.log(req.body.Order);
  if (req.body.Order){
    var rawcartitem = fs.readFileSync('cart.json')
    var cartitem = JSON.parse(rawcartitem)
    cartitem.push(req.body.Order)
    console.log(cartitem);
    fs.writeFile("cart.json", JSON.stringify(cartitem), 'utf8', function(){})
    res.redirect('menu')
  }else {
    res.redirect("cart")
  }
})
//Made cart endpoint
app.get('/cart', (req, res) => {
  var rawcartitem = fs.readFileSync('cart.json')
  var cartitem = JSON.parse(rawcartitem)
  res.render('cart', {
    list: cartitem
  })
});

//Made login endpoint
app.get('/login', (req, res) => {
  res.render('login')
});
var orderlist = [{
      name: 'urmum'
    }, {
      name: 'balogna'
    }]
//Made orders endpoint
app.get('/orders', (req, res) => {
  res.render('orders', {
    orders: orderlist
  })
});

app.post("/orders", function(req, res){
  console.log(req.body.delete);
  for (var i = 0; i < orderlist.length; i++) {
    if (req.body.delete == orderlist[i].name) {
      orderlist.splice(i,1)
    }
  }
  res.redirect('orders')
})

//Start HTTP Listen Server
app.listen(8000)
