const express = require('express')
const router = express.Router()
const User = require('../models/user') 
const Log = require('../models/log')

router.get('/', async (req, res) => {
    //display login
    res.render("login")
})
 
//user login
router.post('/', async function(req, res){
  let query = Log.find()
  if (req.query.tailNo != null && req.query.tailNo != '') {
    query = query.regex('tailNo', new RegExp(req.query.tailNo, 'i'))
  }
    if (req.query.flownBefore != null && req.query.flownBefore != '') {
    query = query.lte('date', req.query.flownBefore)
    }
    if (req.query.flownAfter != null && req.query.flownAfter != '') {
      query = query.gte('date', req.query.flownAfter)
      }
    try {
        //username input validation
        const user = await User.findOne({ username: req.body.username })
        if (user) {
          //password input validation
          const result = req.body.password === user.password
          if (result) {
            let logs = []
            try{
              //finding the 10 most recently created logs
              logs = await Log.find().sort({ createdAt: 'descending'}).limit(10).exec()
            } catch {
              //if no logs can be found then the array is set to empty
              logs = []
            }   
            //display home.ejs as a home page and passing the variable logs with it
            res.render('secret', {logs: logs})
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