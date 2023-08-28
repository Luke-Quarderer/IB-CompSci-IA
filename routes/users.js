const express = require('express')
const router = express.Router()
const User = require('../models/user')

// All Users Route
router.get('/', (req, res) => {
    res.render('users/index')
})

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
}) 

// Create User Route
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name
    })
    user.save().then((err, newUser) => {
        //res.redirect(`users/ ${newUser.id})
        res.redirect(`users`)
    }).catch((err)=>{
        if(err){
        res.render('users/new', {
            user: user, 
            errorMessage: 'Error creating User'
        })}
        console.log(err)
    }) 
})

module.exports = router  