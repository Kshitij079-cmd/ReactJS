//middleware is function that will be passed as argument in routes where login is required
import jwt from "jsonwebtoken"; //jwt authentication proivdes secure communication between client and  server
const JWT_secure = "abce$anuj";
const Secure_token = process.env.SECURE.WEB.TOKEN;

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token =  req.header("auth-token");// post authorisation token in header to get logged user data back
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_secure);// object is verifying secret key and token assign to logged in user
        req.user = data.user; // will provide the user information by verifying the auth-token sent to user 
        console.log(req.user)
        next();
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
export default fetchuser;