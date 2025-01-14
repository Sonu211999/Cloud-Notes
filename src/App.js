import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import About from "./component/About";
import Alert from "./component/Alert";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from './component/Navbar';
import Signup from "./component/Signup";
import NoteState from "./contex/notes/noteState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    //using context api wrap first component to use context seperatly  <NoteContext>
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>}/>
        </Routes>
      </Router>
    </NoteState>
    </>

  );
}

export default App;
