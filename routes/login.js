const express = require('express')
const router = express.Router()

//Login Form
router.get('/', (req, res) => {
    res.render('login');
})

module.exports = router 
