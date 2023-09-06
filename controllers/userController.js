const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOneAndUpdate } = require("../models/delivery");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const saltRounds = 10;
hashedPassword = "";

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
function generateRandomCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    // Generate a random digit between 0 and 9
    const digit = Math.floor(Math.random() * 10);
    code += digit;
  }
  return code;
}

exports.createUserPhone = async (req, res) => {
  const phone = req.body.phoneNumber;
  try {
    const phoneExist = await User.findOne({ phoneNumber: phone });
    if (phoneExist && phoneExist.finishRegister) {
      return res.status(401).json("this phone exist");
    }
    const randomCode = generateRandomCode();
    const token = jwt.sign({ phoneNumber: phone }, process.env.SECRET_KEY);
    if (!phoneExist) {
      const createNewUser = await User.create({
        firstName: null,
        lastName: null,
        phoneNumber: phone,
        verifyCode: randomCode,
        email: null,
        address: null,
        finishRegister: false,
      });
      client.messages
        .create({
          body: `תודה שבחרת PictIt! \n להמשך ההרשמה אנא הכנס את הקוד ${randomCode}`,
          from: "+13612044166",
          to: req.body.phoneNumber,
        })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
      return res.status(200).json(token);
    } else {
      const changeCode = await User.findOneAndUpdate(
        { phoneNumber: phone },
        { verifyCode: randomCode }
      );
      client.messages
        .create({
          body: `תודה שבחרת PictIt! \n להמשך ההרשמה אנא הכנס את הקוד ${randomCode}`,
          from: "+13612044166",
          to: req.body.phoneNumber,
        })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
      return res.status(200).json(token);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.verifyTheCode = async (req, res) => {
  const code = req.body.verifyCode;
  const phoneNumber = req.body.phoneNumber;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (user.verifyCode == code) {
      return res.status(200).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber: req.body.phoneNumber },
      {
        finishRegister: true,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.SignUp = async (req, res) => {
  try {
    const isUser = await User.findOne({ name: req.body.name });
    const isUser1 = await User.findOne({ password: req.body.password });

    if (!isUser && !isUser1) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      console.log(hashedPassword);
      const createUser = await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });
      const token = jwt.sign(
        { _id: createUser._id, name: createUser.name },
        "1234"
      );
      return res.status(200).json({ user: createUser, token });
    }

    return res.status(400).json("Try another");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.Login = async (req, res) => {
  try {
    const isUser = await User.findOne({ name: req.body.name });
    if (!isUser) {
      return res.status(400).json("User not found");
    }
    const isMatch = await bcrypt.compare(req.body.password, isUser.password);
    if (isMatch) {
      const { _id, name } = isUser;
      const token = jwt.sign({ _id, name }, "1234");
      return res.status(200).json(token);
    }
    return res.status(400).json("Wrong password");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
