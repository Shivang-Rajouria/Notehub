import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote} = context;
    const { notes, updateNote } = props;
    
    return (
        <div className='col-md-3'>


            <div className="card">

                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{notes.title}</h5>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                    <i className="fas fa-edit mx-2" onClick={() => { updateNote(notes) }}></i>

                    </div>
                    
                    <p className="card-text">{notes.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem
