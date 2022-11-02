const router = require("express").Router();
const validation = require("../validation/userValidation");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  //validating
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validating if the user is present
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  //Validating password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a JWT TOKEN
  //Add secret token in .env file // SECRET_TOKEN = KAadlndaqDASMDAD12ONAD#$BBAKBD!# (Secret token can be anything)
  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN); // Passing user unique ID as a first param and a Secret token which can be of anything as a second param
  res.header("auth-token", token).send(user);
});

router.post("/register", async (req, res) => {
  //validating
  console.log('======',req.body);
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validating if the user is allready in DB
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Creating a new user
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
