const express = require('express')
const session=require('express-session')
const mongoStor=require('connect-mongo')(session)
const app = express()

const router = require('./router')
let sessionOptions=session({
    secret:"javascript is sooo coool",
    store:new mongoStor({client:require("./db")}),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24,
        httpOnly:true
    }
})
app.use(sessionOptions)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app