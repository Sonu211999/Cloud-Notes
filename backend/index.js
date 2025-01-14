const connectToMongo = require("./dbconnect");
const express = require("express");
var  cors = require('cors');// for cross origin resource sharing

connectToMongo();
const app = express();
const port = 5000;
app.use(cors());// for cross origin resource sharing
// available routes
app.use(express.json()); // for parsing json and using json data and middleware it is always use before the routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));
// request send form the user to the server
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})