const mongoose = require("mongoose");
const { Schema } = mongoose; // destructuring the schema

const Noteschema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,// this is the id of the user for which the note is created
        ref: "User"// this is the name of the user model which is created in the user.js
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", Noteschema);