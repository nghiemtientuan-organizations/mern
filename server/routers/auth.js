const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { username, password } = req.body

    //simple validation
    if (!username || !password) return res.status(400).json({
        success: false,
        message: 'Missing username or password'
    })

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({
            success: false,
            message: 'Username is existed'
        })

        const hashPass = await argon2.hash(password)
        const newUser = new User({ username, password: hashPass })
        await newUser.save();


    } catch (error) {
        console.log(error);
    }
})

module.exports = router