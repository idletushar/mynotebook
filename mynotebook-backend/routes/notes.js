const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //express-validator version 6.12.0

//Route:1 - Get all the Notes using: GET "/api/auth/fetchallnotes" ,  login require
router.get('/fetchallnotes', fetchuser , async (req, res)=>{
    try{
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");  
}
})

//Route:2 - Add a New Notes using: POST "/api/auth/addnote" ,  login require
router.post('/addnote', fetchuser , [
    body('title', 'Enter a Valid name').isLength({min: 3}),
    body("description", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
], async (req, res)=>{
    try {
    const {title, description, tag} = req.body; 
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const note = new Note({
        title, description, tag, user: req.user.id  
    })    
    const savedNote = await note.save()

    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");  
}
})

module.exports = router