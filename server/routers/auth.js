const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  //simple validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing username or password',
    });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({
        success: false,
        message: 'Username is existed',
      });

    const hashPass = await argon2.hash(password);
    const newUser = new User({ username, password: hashPass });
    await newUser.save();

    // return token
    const assesToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'User is created successfully',
      assesToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @route POST api/auth/login
// @desc login
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //simple validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing username or password',
    });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    let checkPass = false;
    if (user) {
      checkPass = await argon2.verify(user.password, password);
    }
    if (user && checkPass) {
      // return token
      const assesToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({
        success: true,
        message: 'Login success successfully',
        assesToken,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Username or password is wrong',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
