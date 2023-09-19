const express = require('express')
const router = express.Router()
const User = require('../models/user')

// All Users Route
router.get('/', async (req, res) => {
    try{
        const users = await User.find({})
        res.render('users/index', { users: users})
    } catch {
        res.redirect('/')
    }
})

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
}) 

// Create User Route
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name
    })

    try{
        const newUser = await user.save()
        //res.redirect(` / ${newUser.id})
        res.redirect(`users`)
    } catch {
        res.render('users/new', {
            user: user, 
            errorMessage: 'Error creating User'
        })
    }   
})

module.exports = router  