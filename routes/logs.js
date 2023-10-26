const express = require('express')
const router = express.Router()
const User = require('../models/log')

// All Logs Route
router.get('/', async (req, res) => {
  res.send('All Logs')
})

// New Log Route
router.get('/new', (req, res) => {
    res.send('New Log')
}) 

// Create Log Route
router.post('/', async (req, res) => {
  res.send('Create Log') 
})

module.exports = router  