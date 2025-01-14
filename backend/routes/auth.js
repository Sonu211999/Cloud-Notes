const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {body, validationResult} = require("express-validator");//for validations for not found valid data their they require auth
const bcrypt = require("bcryptjs");  // for hashing the password and salting the password for security
const jwt = require("jsonwebtoken"); // for generating token to safe the data and useing in authentacation time 
const JWT_SECRET = "iNotebookisagoodb$y"; // my secret key or segnature which is used to sign the token
const fetchuser = require("../midleware/fetchuser");
router.use(express.json());// middle ware to parse json data





//******************************************************************ROUTES 1 ************************************************************************** */
// create a user using : POST "api/auth/createuser" . does not require auth*********************CREATING USER*********************************************************
router.post("/createuser", [
    body("email","Enter a valid email").isEmail(),
    body("name", "Enter a namer at least 4 characters"/*this is a validation message send to the user which not enter the at leat 4 charactor*/).isLength({min: 4}),
    body("password", "Enter a password at least 5 characters and alphanumeric").isLength({min: 5}).isAlphanumeric()
    // make a async and await for the validations
],async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    // check whther the user email is exists or not 
    // and for the error we use try catch
    try {
        let user = await User.findOne({email: req.body.email});
        console.log(user);
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }



        // make a function to hash the password and salt the password***************************************************************SECURITY********************************
        const salt = await bcrypt.genSalt(10);// for adding some extra security
        const secPass = await bcrypt.hash(req.body.password, salt);// for adding password in the database using the hash function



        // create a new user************************************************
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // using jwt create token 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);// to generate token
        success = true;// to use in the frontend it is important
        res.json({ success,authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
        
    }
    }





    
)//******************************************************************ROUTES 2 ************************************************************************** */
// ******************************************************************AUTHENTICATION*********************************************************
// login a user using : POST "api/auth/login" . does not require auth*********************LOGIN USER********************************************************
router.post("/login", [
    body("email","Enter a valid email").isEmail(),
    body("password","Enter the valid password").exists()
],async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        // to compare the password we use bcrypt compare function
        const comparepassword  = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);// to generate token
        success = true;// to use in the frontend it is important
        res.json({ success, authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
        
    }
})
//*********************************************************Get user details ******************************************************
// -------------------------------Route 3: Get logged in user details using : POST "api/auth/getuser" . requires auth--------------------------------------
router.post("/getuser", fetchuser, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router