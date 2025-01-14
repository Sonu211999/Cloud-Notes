import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../contex/noteContex';
import AddNote from './AddNote';
import Notesitem from './Notesitem';

const Note = (props) => {
    const context = useContext(noteContext);
    let history = useNavigate();
    // destructing the context
    const { notes, getAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", edtitle: "", eddescription: "", edtag: "" });// initialize the state using use state hook
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getAllNotes();
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const reftnclose = useRef(null); // for closing the modal
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, edtitle: currentNote.title, eddescription: currentNote.description, edtag: currentNote.tag, _id: currentNote._id });
        // props.showAlert("Updated Successfully", "success")
        
    }
    const handleupdate = (e) => {
        reftnclose.current.click();
        editNote(note.id, note.edtitle, note.eddescription, note.edtag);
        e.preventDefault(); // use to prevent the default behaviour not to reload the page
        props.showAlert("Updated Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })// use to update the state
    }
    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            {/* <!-- Button trigger modal --> */}
            <button ref={ref}/*use as a refrence to open the modal */ type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* form for update  */}
                        <div className="modal-body">
                            <div className='container my-3'>
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="text-center my-2"><h3><span className='badge bg-danger'><i className="fa-solid fa-folder-plus mx-2"></i> Update a Note</span></h3></div>
                                        <form>
                                            <div className="mb-3">
                                                {/* the value is used to show the previoues value of the note */}
                                                <label htmlFor="edtitle" className="form-label">Tittle</label>
                                                <input type="text" className="form-control" id="edtitle" name="edtitle" aria-describedby="emailHelp" value={note.edtitle} onChange={onChange} />
                                                <div id="titleHelp" className="form-text">We'll never share your information with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="edDescription" className="form-label">Description</label>
                                                <input type="text" className="form-control" id="edDescription" name='eddescription' value={note.eddescription} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="edTag" className="form-label">Tag</label>
                                                <input type="text" className="form-control" id="edTag" name='edtag' value={note.edtag} onChange={onChange} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={reftnclose} type="button" clashandelupdatsName="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edtitle.length < 5 || note.eddescription.length < 5} onClick={handleupdate} type="button" className="btn btn-primary">Upadate text</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-2">
                        {notes.length === 0 && "Sorry no notes to desplay"} {/* if notes is empty to display the not a single notes is present */}
                    </div>
                    {notes.map((note) => {
                        return <Notesitem key={note._id}/*for adding unonique key everytime*/ updateNote={updateNote} showAlert={props.showAlert}// for update the onclick listner
                            note={note} />
                    })}
                </div>

            </div>
        </>
    )
}

export default Note
