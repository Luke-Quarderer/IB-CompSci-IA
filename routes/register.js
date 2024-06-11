const express = require('express')
const router = express.Router()
const User = require('../models/user')

// display registration form
router.get('/', function (req, res) {
    res.render("register");
})
 
// user registration
router.post('/', async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      logs: req.body.logs
    })
   res.redirect('/')
    //return res.status(200).json(user)
  })

  module.exports = router 