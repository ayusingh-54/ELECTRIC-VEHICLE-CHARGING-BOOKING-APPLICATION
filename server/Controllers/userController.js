const { UserModel } = require("../Models/user.model.js");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    if (!name || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (email) {
      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: "Email already used." });
      }
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(201).json({ message: "Registration Completed" });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ error: "Please fill all fields" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Email or password is incorrect." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "100h" }
    );

    return res.status(200).send({ message: "Login success.", user, token });
  } catch (error) {
    res.status(500).send(error, "Server Error");
  }
};

module.exports = { registerUser, loginUser };
