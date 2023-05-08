const app=require('express').Router()
const userModel=require('../models/user.model')
const transactionHistory=require('../models/transaction.model')
const authant=require('../middellwares/auth')
app.post('/sendMoney',authant,async(req,res)=>{
    const {phone,amount}=req.body
    if(!phone||!amount){
        return res.status(400).json({ message: 'fields required' })
    }
    let reciever= await userModel.findOne({phone})

    let newBalance=amount+reciever.balance
    const receiverBalance = await userModel.updateOne(
        { phone: reciever.phone }, // Query object - find documents with phone 'reciever phone'
        { $set: { balance: newBalance } } // Update object - set balance to receiver Balance
      )
      
      let senderPerson=req.person.phone
      let sender= await userModel.findOne({phone:senderPerson})
      if(sender.balance<=0){
           res.status(200).json({message:"you dont have any money"})
      }
      else
      {
        let senderBalance=sender.balance-amount
        const UpdateSenderBalance = await userModel.updateOne(
        { phone: sender.phone }, // Query object - find documents with phone to senderPhone
        { $set: { balance: senderBalance } } // Update object - set balance to senderBalance
        )

      const NewSenderAmount = `New Sender Balance, ${senderBalance}`
      const NewRecieverAmount = `New Reciever Balance, ${reciever.balance}!`
      const response = {

        NewSenderAmount: NewSenderAmount,
        NewRecieverAmount:NewRecieverAmount
                       }
      const now= new Date()
      transactionHistory.insertMany({ RecieverPhone:reciever.phone,TransactionAmount:amount,SenderPhone:sender.phone,date:now})
    
      res.status(200).json(
        {
            message:"sender and reciever phone with thier Amounts",
          data:{
            SenderPhone:sender.phone,
            SenderAmount:sender.balance,
            RecieverPhone:reciever.phone,
            RecieverAmount:reciever.balance
          }
        },
       
      )
}
})
module.exports=app
