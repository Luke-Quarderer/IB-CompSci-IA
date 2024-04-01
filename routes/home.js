const express = require('express')
const router = express.Router()
const Log = require('../models/log')

 //default route
router.get('/', async (req, res) => {
    let logs = []
    try{
        //finding the 10 most recently created logs
        logs = await Log.find().sort({ createdAt: 'descending'}).limit(10).exec()
    } catch {
        //if no logs can be found then the array is set to empty
        logs = []
    }
    //display secret.ejs as a home page and passing the variable logs with it
    res.render('secret', {logs: logs})
})


module.exports = router 