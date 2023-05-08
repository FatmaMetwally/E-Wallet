const mongoose = require('mongoose');
const transactionHistorySchema= mongoose.Schema({
     RecieverPhone:String,
     TransactionAmount:Number,
     SenderPhone:{
        type:String,
        ref: 'user'
      },
      date:Date
})
module.exports= mongoose.model('transactionHistory',transactionHistorySchema)