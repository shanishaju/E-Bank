const User = require("../modal/userModel");
const jwt = require("jsonwebtoken");

//Registartion
// Account number generator
const getAccountNumber = async () => {
  const lastUser = await User.findOne().sort({ accountnum: -1 });
  return lastUser ? lastUser.accountnum + 1 : 1000; // Start from 1000 if no user exists
};

// Function to calculate age from date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  //console.log(birthDate); //1996-02-21T00:00:00.000Z

  //creating currect date
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear(); //getFullYear() is a JavaScript method used to get the 4-digit year from a Date object
  const monthDiff = today.getMonth() - birthDate.getMonth(); //.getMonth() returns the month as a number (0-11).

  // If birth month is ahead in the current year or it's the same month but a later day, reduce age by 1
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Register function
exports.registerController = async (req, res) => {
  const { fname, lname, gender, dateOfBirth, email, phonenum, password } =
    req.body;

  try {
    if (!fname || !lname || !gender || !dateOfBirth || !email || !phonenum || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!/^\d{10}$/.test(phonenum)) {
      return res.status(400).json({ message: "Invalid phone number!" });
    }

    // Validate Age
    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      return res.status(400).json({ message: "You must be at least 18 years old to register." });
    }

    const existingUser = await User.findOne({ phone: phonenum });
    if (existingUser) {
      return res.status(400).json({
          message: "This number is already registered with another account",
        });
    }

    // Generate new account number
    const accountnum = await getAccountNumber();

    // Create and save new user
    const newUser = new User({
      firstname: fname,
      lastname: lname,
      accountnum,
      dob: dateOfBirth,
      gender,
      email,
      phone: phonenum,
      password,
      balance: 0
    });

    await newUser.save();
    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Registration failed due to ${error.message}` });
  }
};

//Login function
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email, password });
    if (existingUser) {
      //jwt token generation
      const token = jwt.sign({userId:existingUser._id},'supersecretkey');

      return res.status(200).json({ 
        message: "Login successful", 
        user: {
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                balance: existingUser.balance,
                kycstatus: existingUser.kycStatus,
              },
        token: token
      });
    } else {
      return res.status(400).json({ message: "Email or password doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Login failed due to ${error.message}` });
  }
};

//user details api
exports.getAccountDetails = async (req, res) => {
  try {
    const userId = req.user.userId; // from decoded token
    const userDetails = await User.findById(userId).select("firstname lastname email phone dob gender address");

    if (!userDetails) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ userDetails });
  } catch (error) {
    return res.status(500).json({ message: `Failed to fetch account details: ${error.message}` });
  }
};

//get balance
exports.getBalanceController = async (req, res)=>{
  try{
    const userId = req.user.userId
    const user = await User.findById(userId).select('balance')

    if(!user){
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    return res.status(500).json({ message: `Failed to fetch balance: ${error.message}` });
  }
};

//update profile

exports.updateProfileController = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { firstname, lastname, email, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname, email, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: `Profile update failed: ${error.message}` });
  }
};




