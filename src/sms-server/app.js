const express = require("express")
const bodyparser = require("body-parser")
const path = require("path")
const app = express()
let router = require('./router/router.js')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(router)
app.use('/node_modules/',express.static(path.join(__dirname,'/node_modules/')))

app.listen(8001,()=>{
    console.log('running----8001');
})