//Require Declarations
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const server = app.listen(port, ()=>console.log(`listening on ${port}`))
const route = require("./routes/products")
const swig = require("swig")
const path = require("path")
const bodyParser = require('body-parser')
const socket = require('socket.io')
const io = socket(server)
const morgan = require('morgan')



//Rendering engine
swig.setDefaults({ cache : false});
app.set("view engine", "html")
app.engine("html", swig.renderFile)

//Body parse
app.use(bodyParser.urlencoded({ extended: false }))

//File system access
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

//Override Post to deleteProduct
app.use(require('method-override')('_method'))

//Logging Func
app.use(morgan('dev'))

//Routing
app.use('/', route(io))
