const express = require('express')
const router = express.Router()
const User = require('../models/log')
const Log = require('../models/log')
const log = require('../models/log')
const { render } = require('ejs')

// All Logs Route
router.get('/', async (req, res) => {
  try{
    const logs =  await Log.find({})
    res.render('logs/index', {
      logs: logs,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Log Route
router.get('/new', async  (req, res) => {
  renderNewPage(res, new Log())
}) 

// Create Log Route
router.post('/', async (req, res) => {
  const log = new Log({
    date: new Date(req.body.date),
    timeFlown: req.body.timeFlown,
    vfrIFR: req.body.vfrIFR,
    conditions: req.body.conditions,
    solo: req.body.solo,
    instructorLicense: req.body.instructorLicense,
    tailNo: req.body.tailNo
  })
  try{
    const newLog = await log.save()
    res.redirect('logs')
  } catch {
    renderNewPage(res, log, true)
  }
})

async function renderNewPage(res, log, hasError = false){
  try {
    const params = {
      log: log
    }
    if(hasError) params.errorMessage = 'Error Creating Log'
    res.render('logs/new', params)
  } catch {
    res.redirect('/logs')
  }
}

module.exports = router  