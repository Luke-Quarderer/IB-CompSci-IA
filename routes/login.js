const express = require('express')
const router = express.Router()
const User = require('../models/user') 

router.get('/', async (req, res) => {
    //display login
    res.render("login")
})
 
//user login
router.post('/', async function(req, res){
    try {
        //username input validation
        const user = await User.findOne({ username: req.body.username })
        if (user) {
          //password input validation
          const result = req.body.password === user.password
          if (result) {
            res.render("secret")
          } else {
            res.status(400).json({ error: "password doesn't match" })
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" })
        }
      } catch (error) {
        res.status(400).json({ error })
      }
})
 
//user logout
router.get('/', function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
      })
})

module.exports = router 