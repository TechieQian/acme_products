let products = [
  {
    name : "Foo",
    rating : 7,
    id : 1
  },
  {
    name : "Bar",
    rating : 6,
    id : 2
  }
]

module.exports = {

  id : products.length,

  getTop : function () {
    var highest = products[0]
    products.forEach(function(product) {
      if (product.rating > highest.rating) {
        highest = product
      }
    })
    return highest
  },

  getProducts : function () { return products },

  getProductById : function(id) {
    return products.filter(x=> x.id == id)[0]
  },

  addProduct : function (name,rating) {
    let id = ++this.id
    products.push({ name : name ,rating : rating, id: id} )
  },

  deleteProduct : function(id) {
    products = products.filter(x=> x.id !=id)
  }
}
