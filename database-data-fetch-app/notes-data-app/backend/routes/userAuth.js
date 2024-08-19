import User from "../modules/User.mjs";
import OTP from "../modules/OTPSchema.mjs";
import otpGenerator from "otp-generator";
import { body, validationResult } from "express-validator";
import express from "express";
import bcrypt from "bcrypt";
import fetchuser from "../middleware/fetchuser.mjs";
import jwt from "jsonwebtoken";
//jwt authentication provides secure communication between client and  server
//it verifies the user on the basis of web token whenever user try to access any protected route
const router = express.Router();
const JWT_secure = "abce$anuj"; //secret key issued by a server the sign and verify every user's unique JWT. one of the best example for JWT is amazon, where unique unique token is provided to the user and, for example, at the time of doing payment, amazon checks this authorisation token.
// i have hard coded the token, but its not recommended

//ROUTE 1: creating a user using: Post '"api/auth" . doesn't require auth
router.post(
  "/authentication-with-otp", //creating the user endpoint
  [
    body("name", "Enter a valid name").notEmpty(), //some validation rules so that any property should not remain empty
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must contains 6 characters").isLength({ min: 6 }).notEmpty(),
    body("gender").notEmpty(),
    body("otp").notEmpty(),
  ],
  async (req, res) => {
    const { name, email, otp, password, gender } = req.body;

    let success = false;
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
      const response = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1);
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
      let secPass = await bcrypt.hash(req.body.password, salt); //providing 10 characters hashing and addling some salt (recommeded for weaker or common password)

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
      const authtoken = jwt.sign(data, JWT_secure); //providing a web token after signing up or creating a account just to visit website and not on protected route
      console.log("logging jwt data", authtoken);
      console.log("request has been sent with ", res.json({ authtoken })); //getting response for authorisation token in the form of JSON
    } catch (error) {
      if (error.code === 11000) {
        success = false;
        // Duplicate key error, return bad request . Express validator used to avoid duplicacy of an api key
        return res
          .status(400)
          .json({ success, error: "Email already exists, Please Enter a unique email" });
      }
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
    // console.log("request has been sent ",  res.send(req.body))
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ROUTE 2: authenticating a user using: Post "API/LOGIN" , no login required
router.post(
  "/login", //login endpoint
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "password can not be blank").isLength({ min: 6 }).exists().notEmpty(),
    body("otp").isLength({ min: 6 }).exists().notEmpty(),// adding body's structure and rules
  ],

  async (req, res) => {
    let success = false;
    const result = validationResult(req); // express validator has been used to avoid empty response,
    //if there are errors, return bad request
    if (!result.isEmpty()) {
      console.log("Validation errors:", result.array());
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password, otp } = req.body; //extracting property email, password and OTP to make user login with email, password and OTP and check whether the email exists and password is correct or not
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({success:false, error: "Try again" });
      }
      const responseOTP = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1);
      console.log(responseOTP);
      if (responseOTP.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      } else if (otp !== responseOTP[0].otp) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      }

      const data = {
        //user's data that will be sent by post
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secure,{expiresIn:"4h"}); //providing a web token after signing up or creating a account
      console.log(
        "ACCESS GRANTED ",
        res.json({
          success: "Access Granted",
          authtoken,
        })
      );
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists, Please Enter a unique email" });
      }
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
//ROUTE 3: Get logged in user detailes using: post "API/GETUSER". login required
router.post(
  "/getUser",
  fetchuser, // getting user info endpoint
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "password can not be blank").isLength({ min: 6 }).exists().notEmpty(),
  ],

  async (req, res) => {
    try {
      const userID = req.user.id; //extracted userid to get login user's data
      const uSer = await User.findById(userID).select("-password"); //finding user data excluding password
      res.send(uSer);
      console.log("user fetched", req.user.id);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists, Please Enter a unique email" });
      }
      console.error("Invalid token:", error);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 4 : delete user using : delete "api/deleteUser" details
router.delete("/deleteUser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
  res.send("User deleted");
});

//Route 5: sending otp using: post "api/sendotp-tp-user"
router.post(
  "/sendotp-to-user",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { email } = req.body;
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
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await OTP.findOne({ otp });
      }
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody, "OTP body");
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp: otp,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
);
//Route 6: verifying registered user by sending mail to registered email account
router.post(
  "/verify-registered-user",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered`,
        });
      }
      
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const result = await OTP.findOne({ otp: otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await OTP.findOne({ otp });
      }
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody, "OTP body");
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp: otp,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Export the router
export default router;
