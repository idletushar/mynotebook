const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express-validator version 6.12.0
const User = require('../models/User')


// Create a user using: POST "/api/auth/" , Dosen't require Auth
// we will create an array in router.post for validations
router.post('/',[
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
        res.json({error: 'Please enter an unique value.', message: err.message})})
})

module.exports = router;