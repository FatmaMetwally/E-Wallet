const app=require('express').Router()
const bcrypt = require('bcrypt') 
const userModel=require('../models/user.model')
const jwt = require('jsonwebtoken')

app.post('/login', async(req,res)=>{

const {phone,password}=req.body
const user= await userModel.findOne({phone})
if (user){

    const match = await bcrypt.compare(password,user.password)
    if (match){
      const token=  jwt.sign({user:user._id,role:"user"},'fatma')
    
      res.json({token})
     
    }
    else 
    {
        res.json({message:"wrong password"}) 
    }
}
else               
{
    res.json({message:"user dosn't exist"})
}
})
app.get('/test',(req,res)=>{
    res.json({message:"hello from login"})
})
module.exports=app
