const express = require('express')
const app = express()
const port = 3000
//Body parsing middleware
app.use(express.json({extended:false}))
app.use(express.urlencoded({ extended: false }))
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(require('./routes/register.route'))
app.use(require(('./routes/login.route')))
app.use(require('./routes/send.route'))
app.use(require('./routes/transaction.route'))
mongoose.connect('mongodb+srv://admin:admin@cluster0.ewz604a.mongodb.net/eWalletDB')
app.get('/',(req,res)=>{
    res.json({message:"hello from api"})
})
app.listen(port, () => console.log(`Example app listening  port ${port}!`))
