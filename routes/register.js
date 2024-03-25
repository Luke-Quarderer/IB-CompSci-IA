const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Showing register form
router.get('/', function (req, res) {
    res.render("register");
})
 
// Handling user signup
router.post('/', async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    })
   
    return res.status(200).json(user);
  })

  module.exports = router 