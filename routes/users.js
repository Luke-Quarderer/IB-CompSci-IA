const express = require('express')
const router = express.Router()

// All Users Route
router.get('/', (req, res) => {
    res.render('users/index')
})

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new')
}) 

// Create User Route
router.post('/', (req, res) => {
    res.send('Create')
}) 

module.exports = router  