const app=require('express').Router()
const jwt = require('jsonwebtoken')
const userModel=require('../models/user.model')
function authenticate(req, res, next) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      
      const base64UrlHeader = Buffer.from(JSON.stringify(header))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      

    const {token} = req.headers
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    jwt.verify(token,'fatma', async (err, payload) => {
      if (err) {
        return res.status(405).json({ message: 'Invalid token' });
      }
  
      const { user } = payload;
      const person = await userModel.findById(user);
      if (!person) {
        return res.status(401).json({ message: 'Invalid token person' });
      }
     req.person=person
      next();
    })
    
   
  }
  
  
  
  module.exports=authenticate
