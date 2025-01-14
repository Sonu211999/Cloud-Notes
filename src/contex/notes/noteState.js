import { useState } from "react";
import NoteContext from "../noteContex";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [

  ]
  // fetch all notes  

  const [notes, setNotes] = useState(notesInitial);
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchusernotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      // body: JSON.stringify({title, description, tag})// to send the data in json format// but don't need it in this case
    });
    const json = await response.json();// to get the response
    setNotes(json);// to update the state and visibal on the user interface
  }


  // const state1 = {
  //     "name": "Sonu",
  //     "age": "20",
  //     "gender": "male",
  //     "city": "Delhi"
  // }
  // // to set the set and update the state so the use hook work properly 
  // const [state, setState ,] = useState(state1);
  // const update  = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name": "Pandey",
  //             "age": "21",
  //             "gender": "male",
  //             "city": "Mumbai"
  //         })
  //     }, 1000);
  // }
  // ***********************************************Add Note**********************************************
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })// to send the data in json format
    });
    const note = await response.json();// to get the response
    setNotes(notes.concat(note))
  }
  // ***********************************************Delete Note**********************************************
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      // body: JSON.stringify({title, description, tag})// to send the data in json format but don't need it in this case
    });
    const json = await response.json();// to get the response
    console.log(json);
    console.log("deleting the note", id);
    const newNotes = notes.filter((note) => note._id !== id);// filter the note which is not equal to the id
    setNotes(newNotes);// use to update the state
  }
  // ***********************************************Edit Note**********************************************
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })// to send the data in json format
    });
    const json = await response.json();// to get the response
    console.log(json);
    const newNotes = notes.map((note) => {// for update the note using finde the notes id using map function 
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    });
    setNotes(newNotes);
  }
  return (
    // provide the value of the state in anywhere just using NoteContext.Provider
    // <NoteContext.Provider value = {{state, update }}> 
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
// we don't fetch api dirtectly in this file so we instal first npm install 