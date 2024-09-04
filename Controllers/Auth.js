const User = require("../Modules/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Regester = async (req, res) => {
  // Your registration logic here
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userFound = await User.findOne({ email }).exec();
  if (userFound) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  // const accessToken = jwt.sign(
  //   {
  //     userInfo: {
  //       _id: user._id,
  //     },
  //   },
  //   process.env.SECRET_KEY,
  //   { expiresIn: "15m" }
  // );
  const RefreshToken = jwt.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.REFRECH_KEY,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", RefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  res.status(201).json({
    RefreshToken,
    email: user.email,
    name: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(400).json({ message: "user not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });
  // const accessToken = jwt.sign(
  //   {
  //     userInfo: {
  //       id: user._id,
  //     },
  //   },
  //   process.env.SECRET_KEY,
  //   { expiresIn: "15m" }
  // );
  const RefreshToken = jwt.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.REFRECH_KEY,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", RefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  res.status(201).json({
    RefreshToken,
    email: user.email,
    name: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
};
const logOut = async (req, res) => {
  res.cookie("jwt", "",{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),  // Cookie expires at the start of the current session
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
}
module.exports = {
  Regester,
  Login,
  logOut
};
