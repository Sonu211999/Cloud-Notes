const mongoose = require("mongoose");
 const mongoUri = "mongodb://localhost:27017/?directConnection=true"
 const connectToMongo = () => {
     mongoose.connect(mongoUri,);
     mongoose.connection.on("connected", () => {
         console.log("connected to mongo!");
     })
 }
 module.exports = connectToMongo;