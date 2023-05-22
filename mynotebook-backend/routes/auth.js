const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express-validator version 6.12.0
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'tushartushar@';

// Create a user using: POST "/api/auth/createuser" , No login require
// we will create an array in router.post for validations
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res)=>{
    // if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether user with same email exists already 
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "sorry a user with this email already exists."})
    }
    // for hashing, salting we are using bcrypt.js
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    // creating new user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

    
    const data = {
        user: user.id
    }  
    const authtoken = jwt.sign(data, JWT_SECRET);  

      res.json({authtoken})
    // res.json(user) 

    }catch (error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router;