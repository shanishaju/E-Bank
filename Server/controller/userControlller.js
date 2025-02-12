const users = require("../modal/userModel");

//Account number generator
const getAccountNumber = async () => {
  const lastUser = await users.findOne().sort({ accountnum: -1 }); // Get last user by account number
  return lastUser ? lastUser.accountnum + 1 : 1000; // Start from 1000 if no user exists
};
//register function

exports.registerController = async (req, res) => {
  const { fname, lname, gender, dateOfBirth, phonenum } = req.body;
  try {
    if (!fname || !lname || !gender || !dateOfBirth || !phonenum) {
      res.status(400).json({ message: "All fields are required!" });
    }
    const existinguser = await users.findOne({ phone:phonenum }); //model:name
    if (existinguser) {
      res.status(406).json("Account already exist");
    } else {
      const accountnum = await getAccountNumber(); // Generate new account number

      const newuser = new users({
        firstname: fname,
        lastname: lname,
        accountnum: accountnum,
        dob: dateOfBirth,
        gender: gender,
        phone: phonenum,
      });

      await newuser.save();
      res.status(200).json(newuser);
    }
  } catch (error) {
    res.status(401).json(`registration failed due to ${error}`);
  }
};
