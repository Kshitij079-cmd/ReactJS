import User from "../modules/User.mjs";
import OTP from "../modules/OTPSchema.mjs";
import otpGenerator from "otp-generator";
import { body, validationResult } from "express-validator";
import express from "express";
import bcrypt from "bcrypt";
import fetchuser from "../middleware/fetchuser.mjs"
import jwt from "jsonwebtoken"; 
import { config } from 'dotenv';
import multiConnection from "../tempPortRunner.mjs";
import axios from "axios";
import checkDomainMXRecords from "../emaiValidation/emailValidation.mjs";

//jwt authentication provides secure communication between client and  server
//it verifies the user on the basis of web token whenever user try to access any protected route
const router = express.Router();
const JWT_secure = 'abce$anuj'; //secret key issued by a server the sign and verify every user's unique JWT. one of the best example for JWT is amazon, where unique unique token is provided to the user and, for example, at the time of doing payment, amazon checks this authorisation token.

//ROUTE 1: creating a user using: Post '"api/auth" . doesn't require auth
router.post(
  "/trail-authentication-with-otp", //creating the user endpoint
  [
    body("name", "Enter a valid name").notEmpty(), //some validation rules so that any property should not remain empty
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must contains 6 characters").isLength({ min: 6 }).notEmpty(),
    body("gender").notEmpty(),
  body("otp").notEmpty()
  ],
  async (req, res) => {
    const {name, email, otp,password, gender}= req.body
    
    let success = false
    console.log("Request received with body:", req.body);
    const result = validationResult(req); // express validator has been used to avoid emply response,
    //if there are errors, return bad request
    if (!result.isEmpty()) {
      console.log("Validation errors:", result.array());
      return res.status(400).json({ errors: result.array() });
    }

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        success = false;
        return res.status(400).json({ success, error: "User already exists" });
      }
      const response = await OTP.find({email: email}).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);//providing 10 characters hashing and addling some salt (recommeded for weaker or common password)

      user = await User.create({
        //creating a user with body(with rules i.e., not to be empty etc) so that we can send its data to database
        //assign body to each user keys
        name: req.body.name, //name  key with be parse from User.mjs
        email: req.body.email,
        password: secPass,
        gender: req.body.gender,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secure);//providing a web token after signing up or creating a account just to visit website and not on protected route
      console.log("logging jwt data", authtoken);
      console.log("request has been sent with ",res.json({ authtoken }));//getting response for authorisation token in the form of JSON
    } catch (error) {
      if (error.code === 11000) {
        success = false
        // Duplicate key error, return bad request . Express validator used to avoid duplicacy of an api key
        return res.status(400).json({success, error: "Email already exists, Please Enter a unique email" });
      }
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
    // console.log("request has been sent ",  res.send(req.body))
  }
); 

router.post(
  "/login", //login endpoint
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "password can not be blank").isLength({ min: 6 }).exists().notEmpty(),
    body("otp").isLength({ min: 6 }).exists().notEmpty()
  ],

  async (req, res) => {
    let success =false;
    const result = validationResult(req); // express validator has been used to avoid empty response,
    //if there are errors, return bad request
    if (!result.isEmpty()) {
      console.log("Validation errors:", result.array());
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password, otp } = req.body; //extracting property email and password to make user login with email and password and check whether the email exists and password is correct or not
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success:false, error: "no user found" });
      }
      const response = await OTP.find({email: email}).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ error: "Try again" });
      }
      const data = {
        //user's data that will be sent by post
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secure);//providing a web token after signing up or creating a account
      console.log("ACCESS GRANTED ", res.json(
        { 
          success:"Access Granted",
          authtoken
        }));
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists, Please Enter a unique email" });
      }
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
/*****!************** */
//Route : sending otp 
router.post("/sendotp-to-user",[body("email", "Enter a valid email").isEmail()], async (req, res) => {
  try {
		const { email } = req.body;
    console.log(req.body)
		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		let otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
      result = await OTP.findOne({ otp });
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp: otp,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
})
/*****!************** */
//route to create user in test db
router.post(
  "/create-user-in-tb",
  [
    body("name", "Enter a valid name").notEmpty(), //some validation rules so that any property should not remain empty
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must contains 6 characters").isLength({ min: 6 }).notEmpty(),
    body("gender").notEmpty(),
  ],
  async (req, res) => {
    const { testConnection,
      //  reactappConnection
       } = multiConnection()// extracting database

    const {name, email,password, gender}= req.body
    const [localPart, domain] = email.split('@');
    const UserTest = testConnection.model('User', User.schema);// using schema in any database
    //const Post =  reactappConnection.model("Post", PostSchema.schema)

    let success = false
    console.log("Request received with body:", req.body);
    const result = validationResult(req); // express validator has been used to avoid emply response,
    //if there are errors, return bad request
    // if (!result.isEmpty()) {
    //   console.log("Validation errors:", result.array());
    //   return res.status(400).json({ errors: result.array() });
    // }
    if (!domain) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const hasMXRecords = await checkDomainMXRecords(domain);
    if (!hasMXRecords) {
      return res.status(400).json({ error: 'Domain does not have MX records' });
      }

    try {
      let user= await UserTest.findOne({email: email});// findOne wil return null if no user is found
      console.log("found user",user)
      if (user) {
        success = false;
        return res.status(400).json({ success, error: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);//providing 10 characters hashing and addling some salt (recommeded for weaker or common password)

      user = await UserTest.create({
        //creating a user with body(with rules i.e., not to be empty etc) so that we can send its data to database
        //assign body to each user keys
        name: req.body.name, //name  key with be parse from User.mjs
        email: req.body.email,
        password: secPass,
        gender: req.body.gender,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secure);//providing a web token after signing up or creating a account just to visit website and not on protected route
      console.log("logging jwt data", authtoken);
      console.log("request has been sent with ",res.json({ authtoken }));//getting response for authorisation token in the form of JSON
    } catch (error) {
      if (error.code === 11000) {
        success = false
        // Duplicate key error, return bad request . Express validator used to avoid duplicacy of an api key
        return res.status(400).json({success, error: "Email already exists, Please Enter a unique email" });
      }
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
)
router.post(
  "/getTotaluser",
 // getting user info endpoint
  async (req, res) => {
    try {    
      const {  reactappConnection
       } = multiConnection()
       
       const UserReactt = reactappConnection.model('User', User.schema);
      const uSer = await UserReactt.find({}, "name email")
      console.log("user data", uSer)
      const totalUsersinDB= uSer.length
      console.log(totalUsersinDB)
      if(!uSer){
        return res.status(404).json({success: false, error: "No user found"})
      }
      else{
        return res.status(200).json({success: true, data: uSer,
          totalUsers: totalUsersinDB
        })
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists, Please Enter a unique email" });
      }
      console.error("Invalid token:", error);
      res.status(500).send("Internal server error");
    }
  }
);

// Export the router
export default router;
