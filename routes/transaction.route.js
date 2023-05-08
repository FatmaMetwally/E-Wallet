const app=require('express').Router()
const transactionHistory=require('../models/transaction.model')
const authant=require('../middellwares/auth')

app.get('/TransactionHistory',authant,async(req,res)=>{

    const senderHistory =req.person.phone 
  const History=await transactionHistory.find({SenderPhone:senderHistory},
    { RecieverPhone: 1, TransactionAmount: 1,date:1,_id:0}).sort({ date:-1 })
    res.status(200).json({message:"your transactions ",History})
})
 

module.exports=app