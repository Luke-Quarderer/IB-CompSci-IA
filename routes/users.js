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
        res.redirect(` / ${newUser.id}`)
    } catch {
        res.render('users/new', {
            user: user, 
            errorMessage: 'Error creating User'
        })
    }   
})

router.get('/:id', (req, res) => {
    res.send('Show User ' + req.params.id)
})
//Edit User Route
router.get('/:id/edit', async  (req,res) => {
    try{
        const user = User.findById(req.params.id)
        res.render('users/edit', {user: user})
    }
    catch{
        res.redirect('/users')
    }
})

router.put('/:id', async (req, res) => {
    let user
    try{
        user  = await User.findById(req.params.id)
        await user.save()
        res.redirect(`/users/${user.id}`)
    } catch {
        if(user == null){
            res.redirect('/')
        }
        res.render('users/edit', {
            user: user, 
            errorMessage: 'Error updating User'
        })
    }   
})
//Delete User Route
router.delete('/:id', (req, res) => {
    res.send('Delete User ' + req.params.id)
})

module.exports = router  