import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, addNote } = context;

    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((notes) => {
                return <Noteitem key={notes._id} notes={notes} />
            })}
        </div>
        </>
    )
}

export default Notes
