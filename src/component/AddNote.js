import React, { useContext, useState } from 'react';
import noteContext from '../contex/noteContex';

const AddNote = (props) => {
  const context = useContext(noteContext);// entery point to create context using context api
  const { addNote } = context;// definme context name
  const [note, setNote] = useState({ title: "", description: "", tag: "" });// initialize the state using use state hook

  const handleSubmit = (e) => {
    e.preventDefault(); // use to prevent the default behaviour not to reload the page
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })// to reset the state 
    props.showAlert("Added Successfully", "success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })// use to update the state
  }
  return (
    <div className='container my-3'>
      <div className="card ">
        <div className="card-body">
          <div className="text-center my-2"><h3><span className='badge bg-danger'><i className="fa-solid fa-folder-plus mx-2"></i> Add a Note</span></h3></div>
          <form>
            <div className="mb-3">

              <label htmlFor="title" className="form-label">Tittle</label>
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
              <div id="titleHelp" className="form-text">We'll never share your information with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <input type="text" className="form-control" id="Description" name='description' value={note.description} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="Tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="Tag" name='tag' value={note.tag} onChange={onChange} />
            </div>

            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-success" onClick={handleSubmit}>Add a Note</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNote
