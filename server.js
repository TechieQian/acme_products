//Require Declarations
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const server = app.listen(port, ()=>console.log(`listening on ${port}`))
const route = require("./routes/products")
const swig = require("swig")
const path = require("path")
const bodyParser = require('body-parser')


//Rendering engine
swig.setDefaults({ cache : false});
app.set("view engine", "html")
app.engine("html", swig.renderFile)

//Body parse
app.use(bodyParser.urlencoded({ extended: false }))

//File system access
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

//Logging Func
const logger = (req,res,next) => {console.log(req.method, req.originalUrl, res.statusCode) ; next() }
app.use(logger)

//Routing
app.use('/', route())
