const app = require('express').Router()
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const validator = require('validator')
const userModel = require('../models/user.model')

app.post('/register', async (req, res) => {


   try {
      const { name, phone, NID, age, password, gender, address, parentPhone, role } = req.body

      const user = await userModel.findOne({ phone })
      if (user) {

         res.status(409).json({ message: "phone already exist" })
      } else if(role==="child" &&!parentPhone){
         res.json({message:"parent is recuired"})
      }
      else
       {

         const validGenders = ['male', 'female'];
         //the gender valid values
         // Check that the name consists of only alphabetic characters and spaces
         // nameRegex = /^[a-zA-Z ]+$/
         // Check if the gender is one of the valid values
         // birth string should match YYYY-MM-DD
         // Check that the name consists of one or more words, where each word contains only alphabetic characters
         if (validator.isStrongPassword(password)
            && validator.isMobilePhone(phone, 'ar-EG')
            && validator.matches(NID, /^[0-9]{14}$/) && validator.matches(age, /^(1[7-9]|[2-9]\d)$/)
            && validator.matches(name, /^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
            && validator.isIn(gender, validGenders)) {
            // Store hash in your password DB.
            bcrypt.hash(password, 7, async function (err, hash) {

              const newUser= await userModel.create({ name, phone, NID, age, address, gender, password: hash, balance: 100 ,role})
              console.log(newUser._id)
               if(role==="child"){
                  await userModel.findOneAndUpdate({phone:parentPhone},{
                     $push:{child:newUser._id}
                  })
               }
               res.status(200).json({ message: "inserted into DB" })
            })
         }
         else {
            res.status(400).json({ message: "invalid data" })
         }


      }

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }


})
module.exports = app
