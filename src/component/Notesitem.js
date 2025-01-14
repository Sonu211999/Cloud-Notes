import React, { useContext } from 'react';
import noteContext from '../contex/noteContex';

const Notesitem = (props) => {
  const contex = useContext(noteContext);
  const { deleteNote } = contex;

  const { note, updateNote } = props
  return (
    <div className='col-md-3 my-3'>
      <div className="card ">
        <div className="card-body">
          <i className="fa-solid fa-trash-can mx-2 float-end" onClick={() => {props.showAlert("Deleted Successfully", "success"); deleteNote(note._id) }}></i>
          <i className="fa-solid fa-file-pen mx-2 float-end" onClick={() => { updateNote(note) }}></i>
          <h3 className="card-title">{note.title}</h3>
          <p className="card-text">{note.description}</p>

        </div>
      </div>
    </div>
  )
}

export default Notesitem
