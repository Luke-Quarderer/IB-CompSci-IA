const express = require('express')
const router = express.Router()

//Handling user logout 
router.get('/', function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
      })
})

module.exports = router  