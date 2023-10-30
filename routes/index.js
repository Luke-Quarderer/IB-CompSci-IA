const express = require('express')
const router = express.Router()
const Log = require('../models/log')
 
router.get('/', async (req, res) => {
    let logs = []
    try{
        logs = await Log.find().sort({ createdAt: 'descending'}).limit(10).exec()
    } catch {
        logs = []
    }
    res.render('index', {logs: logs })
})

module.exports = router 