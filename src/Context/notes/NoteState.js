import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "646cbc853192e962f6e1a8bf",
          "user": "646ca6282a23c1a2ab88450a",
          "title": "yoo",
          "description": "wake up.",
          "tag": "personal",
          "date": "2023-05-23T13:15:49.767Z",
          "__v": 0
        },
        {
          "_id": "646f04e30febbdf079ab8dcb",
          "user": "646ca6282a23c1a2ab88450a",
          "title": "Hello",
          "description": "wake up.",
          "tag": "personal",
          "date": "2023-05-25T06:49:07.106Z",
          "__v": 0
        },
        {
          "_id": "646f07a13d6dacba4cc8159c",
          "user": "646ca6282a23c1a2ab88450a",
          "title": "iiijijiji",
          "description": "wake up.",
          "tag": "personal",
          "date": "2023-05-25T07:00:49.285Z",
          "__v": 0
        },
        {
          "_id": "646f07a73d6dacba4cc8159e",
          "user": "646ca6282a23c1a2ab88450a",
          "title": "iiikkkk",
          "description": "wake up.",
          "tag": "personal",
          "date": "2023-05-25T07:00:55.691Z",
          "__v": 0
        }
      ]
    

    const [notes, setNotes] = useState(notesInitial)

    // Add new Note
    const addNote = (title, description, tag)=>{
        // TODO api call
        console.log('Adding a New Note')
        let note = {
            "_id": "646f07a72d6dacba4cc8159e",
            "user": "646ca6282a23c1a2ab88450a",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-05-25T07:00:55.691Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
    }

    // Delete Note
    const deleteNote = (id)=>{
        // TODO
        console.log("Deleting the Note with id" + id)
        let newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

    // Edit NOte
    const editNote = (id, title, description, tag)=>{

    }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState