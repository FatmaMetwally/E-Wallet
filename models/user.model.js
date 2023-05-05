const mongoose = require('mongoose');
const userchema= mongoose.Schema({
     name:String,
     phone:String,
     NID:String,
     age:String,
     address:String,
     gender:String,
     password:String

})
module.exports= mongoose.model('user',userchema)