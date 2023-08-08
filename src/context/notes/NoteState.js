import NoteContext from "./NoteContext";
import { useState } from "react";
//we can't pull request for api directly from browser so we use cors package in backend
const NoteState = (props) => {
    const host = "http://localhost:3500"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //get all notes
    const getNotes = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)

    }
    //add a note
    //when you call this addNote function and provide the title, description, and tag of a note, ...It concatenates the new note object to the existing list of notes (notes.concat(note)), creating a new array that includes the old notes as well as the newly added note.
    //here we r using same method to call API which we used in edit function


    const addNote = async (title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note))
       // console.log(json) //this is how we r solving json error by logging it in console "json' is assigned a value but never used"
        
        
        //yaha note add hojayega

    }

    //delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                //token will get from localstorage

            },


        });
        const json = await response.json()
        
        
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //now we need to fetch api ...so  we have copied the below syntax from a website FETCH WITH HEADERS
        //here everything we are fetching from thunderclient
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json()
       
        let newNotes = JSON.parse(JSON.stringify(notes)) //sab newNotes copy paste hojayenge elements me
        // Logic to edit in client
        //whenever u face await error make the function async
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
            setNotes(newNotes);
        }
    }

    return (
        //export krdo sbko
        //NoteContext.Provider component is used to wrap its child components. 
        // It provides the notes state, addNote, deleteNote, and editNote
        //{props.children} ==> exports child components
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState;

