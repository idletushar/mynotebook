import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;

    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((notes) => {
                return <Noteitem notes={notes} />
            })}
        </div>
    )
}

export default Notes
