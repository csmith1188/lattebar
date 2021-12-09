//Import ExpressJS Module
const express = require('express');

const app = express()
//Made view engine ejs
app.set("view engine", "ejs")

app.use(express.static(__dirname + '/cssFiles'))
//Made root endpoint that redirects to the login page
app.get('/', (req, res) => {
  res.redirect('login')
});

//Made menu endpoint
app.get('/menu', (req, res) => {
  res.render('menu')
});

//Made cart endpoint
app.get('/cart', (req, res) => {
  res.render('cart')
});

//Made login endpoint
app.get('/login', (req, res) => {
  res.render('login')
});

//Made orders endpoint
app.get('/orders', (req, res) => {
  res.render('orders', {
    orders: [{
      name: 'urmum'
    }, {
      name: 'balogna'
    }]
  })
});

//Start HTTP Listen Server
app.listen(8000)
