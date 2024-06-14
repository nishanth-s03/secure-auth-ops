import User from "../models/user.model.js";
import {
  checkPassword,
  hashPassword,
  signToken,
} from "../middlewares/auth.midlleware.js";
import validator from "validator";

//Register User
const registerInfo = async (req, res) => {
  try {
    const { username, name, email, mobile, password, confirmPassword } =
      req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //Validate Email
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    // Validate mobile number
    const isValidMobile = validator.isMobilePhone(mobile, ["en-US", "en-IN"]);
    if (!isValidMobile) {
      return res
        .status(400)
        .json({
          message:
            "Invalid phone number. Only US and Indian phone numbers are accepted.",
        });
    }

    // Check if the user or email already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (existingEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      name,
      email,
      mobile,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and new user data (excluding the password)
    const {
      password: pwd,
      confirmPassword: cpwd,
      ...userData
    } = newUser.toObject();
    return res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: `Error occurred: ${error.message}` });
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    //User Existence Checking
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Doesnot Exists!!! Please Register" });
    }

    //Username Checking
    if (!user.username) {
      return res
        .status(404)
        .json({ message: "Username or Password is Inavalid" });
    }

    //Password Matching
    const isMathing = await checkPassword(password, user.password);
    if (!isMathing) {
      return res
        .status(404)
        .json({ message: "Username or Password is Inavalid" });
    }

    //Signing Token If User Input Matches DB Data
    const token = await signToken(user._id, user.username);

    const { password: pass, ...rest } = user._doc;

    return res
      .cookie("access_token", token, { 
        httpOnly: true,
        maxAge: 3600000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    return res.status(500).json({ message: `Server Error:${error.message}` });
  }
};

//Get USer Data
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password: pass, confirmPassword: confirm, ...rest } = user._doc;
    return res.status(200).json({ message: "User Data", rest });
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error.message}` });
  }
};

//Logout 
const userLogout = async (req,res) => {
  try {
    // Clear the access_token cookie by setting its expiry to a past date
    res.cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0) // Set the expiry date to a past date
  });

  return res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error.message}` });
  }
};

export { registerInfo, loginUser, getUserDetails, userLogout };
