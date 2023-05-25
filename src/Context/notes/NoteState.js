import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []


    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Y2E2MjgyYTIzYzFhMmFiODg0NTBhIn0sImlhdCI6MTY4NDg0MjA0MH0.2h2FCnCYnCCVUIZDXQxdcvF4-7IkGaOQwtXWZS_e05U"
            }
        });
        const json = await response.json()
        setNotes(json)
    }


    // Add a Note
    const addNote = async ( title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Y2E2MjgyYTIzYzFhMmFiODg0NTBhIn0sImlhdCI6MTY4NDg0MjA0MH0.2h2FCnCYnCCVUIZDXQxdcvF4-7IkGaOQwtXWZS_e05U"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Delete Note
    const deleteNote = async (id) => {
         // API Call 
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Y2E2MjgyYTIzYzFhMmFiODg0NTBhIn0sImlhdCI6MTY4NDg0MjA0MH0.2h2FCnCYnCCVUIZDXQxdcvF4-7IkGaOQwtXWZS_e05U"
            }
        });
        // eslint-disable-next-line
        const json = await response.json()

        let newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Y2E2MjgyYTIzYzFhMmFiODg0NTBhIn0sImlhdCI6MTY4NDg0MjA0MH0.2h2FCnCYnCCVUIZDXQxdcvF4-7IkGaOQwtXWZS_e05U"
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState