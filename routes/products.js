const express = require('express');
const router = express.Router();
const db = require('../db.js')

router.get('/', function(req,res) {
  res.render('index',db.getTop())
})

router.get('/products', function(req,res) {
  console.log("listing products", db.getProducts())
  res.render('products', { products : db.getProducts() })
})

router.get('/product/:id', function (req,res) {
  var id = req.params.id;
  res.render('product',{ product : db.getProductById(id) })
})

router.get('/error', (req,res) => res.render('error', {}))

module.exports = function (io) {
  router.post('/products', function(req,res) {
    let rating = parseInt(req.body.rating)
    let name = req.body.name
    if( rating && (rating => 0) && (rating <= 10) && name) {
      db.addProduct(name, rating)
      let id = db.getProductByName(name)["id"]
      io.emit('newProduct', {name: name, rating: rating, id : id})
      res.redirect('/products')
    }
    else {
      res.redirect('/error')
    }
  })

  router.delete('/product/:id', function(req,res) {
    db.deleteProduct(req.params.id*1)
    res.redirect('/products')
  })

  return router
}
