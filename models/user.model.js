const mongoose = require('mongoose');
const userchema = mongoose.Schema({
     name: String,
     phone: String,
     NID: String,
     age: String,
     address: String,
     gender: String,
     password: String,
     balance: Number,
     child: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
     role: {
          type: String,
          enum: ['parent', 'child'],
          required: true,
          default: 'parent'
     }

})
module.exports = mongoose.model('user', userchema)
