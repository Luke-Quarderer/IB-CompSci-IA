const express = require('express')
const router = express.Router()
const User = require('../models/user')

// All Users Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const users = await User.find(searchOptions)
        res.render('users/index', { 
            users: users, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New User Route
router.get('/new', (req, res) => {
     
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

router.get('/:name', (req, res) => {
    res.send('Show User ' + req.params.name)
})
//Edit User Route
router.get('/:name/edit', async  (req,res) => {
    try{
        const user = User.findById(req.params.id)
        res.render('users/edit', {user: user})
    }
    catch{
        res.redirect('/users')
    }
})

router.put('/:name', (req, res) => {
    res.send('Update User ' + req.params.name)
})
//Delete User Route
router.delete('/:name', (req, res) => {
    res.send('Delete User ' + req.params.name )
})

module.exports = router  