const express = require("express");
const router = express.Router();
const fetchuser = require("../midleware/fetchuser");
const Note = require("../models/Notes");
const {body, validationResult} = require("express-validator");

// ----------------------------------------------ROUTE 1----------------------------------------------

router.get("/fetchusernotes", fetchuser, async(req, res) => {
  try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
    
  } catch (error) {
    console.error(error.message);
    res.status(500)
  }
 })
// ----------------------------------------------ROUTE 2----------------------------------------------
// ==============================For creating a new note=============================================
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 4 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Debugging: Log the request body
      console.log("Request Body:", req.body);

      const { title, description, tag } = req.body; // for the destructure the request body

      // Validate errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create and save the new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      // Debugging: Log the saved note
      console.log("Saved Note:", savedNote);

      res.json(savedNote);
    } catch (error) {
      console.error("Error creating note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ----------------------------------------------ROUTE 3----------------------------------------------
// ==============================For updating a note=============================================
router.put("/updatenote/:id",fetchuser,async(req,res)=>{
const { title, description, tag} = req.body;
//create a note object 
const newnotes = {};
if (title){newnotes.title = title};
if(description){newnotes.description = description};
if(tag){newnotes.tag = tag};
//find the notes to update it 
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("not found")}
if(note.user.toString() !== req.user.id)
  {return res.status(401).send("Not allow")}
note =  await Note.findByIdAndUpdate(req.params.id, {$set:newnotes},{new:true})
res.json({note});
})
// ------------------------------------------------ROUTE 4-------------------------------------------------
// ==================================DELETE THE NOTE======================================================
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  const {title, description, tag} = req.body;
  //find the notes will deleted 
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Data not found")}
  // allow deletion only login and owner user only 
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Access Denied!");
  }
  note  = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted successfully"});

})


module.exports = router
