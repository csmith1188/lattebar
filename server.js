//Import ExpressJS Module
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var mysql = require('mysql');
var db = new sqlite3.Database('orderlist.db');

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
  res.redirect("cart")
})
//Made cart endpoint
app.get('/cart', (req, res) => {
  res.render('cart')
});

//Made login endpoint
app.get('/login', (req, res) => {
  res.render('login')
});
var orderlist = [{
      name: 'order1'
    }, {
      name: 'order2'
    },
    {
      name: 'order3'
    },
    {
      name: 'order4'
    },
    {
      name: 'order5'
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
