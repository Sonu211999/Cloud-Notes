const jwt = require("jsonwebtoken"); // for generating token to safe the data and useing in authentacation time 
const JWT_SECRET = "iNotebookisagoodb$y"; // my secret key or segnature which is used to sign the token
const fetchuser = (req, res, next) => {
    const token  = req.header("auth-token");
    if (!token){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
    try {
        const data  = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"});
    }
}
module.exports = fetchuser