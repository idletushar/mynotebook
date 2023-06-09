const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //express-validator version 6.12.0

//Route:1 - Get all the Notes using: GET "/api/notes/fetchallnotes" ,  login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route:2 - Add a New Notes using: POST "/api/notes/addnote" ,  login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid name').isLength({ min: 3 }),
    body("description", "Description must be atleast 8 characters").isLength({
        min: 8,
    }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
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

//Route:3 - Update Notes using: PUT "/api/notes/updatenote/" ,  login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be updated and update It.
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route:4 -- delete an existing Notes using: DELETE "/api/notes/deletenote/" ,  login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted and delete It.
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router