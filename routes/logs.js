const express = require('express')
const router = express.Router()
const User = require('../models/log')
const Log = require('../models/log')
const log = require('../models/log')
const { render } = require('ejs')


// All Logs Route
router.get('/', async (req, res) => {
  let query = Log.find()
  if (req.query.tailNo != null && req.query.tailNo != '') {
    query = query.regex('tailNo', new RegExp(req.query.tailNo, 'i'))
  }
    if (req.query.flownBefore != null && req.query.flownBefore != '') {
    query = query.lte('date', req.query.flownBefore)
    }
    if (req.query.flownAfter != null && req.query.flownAfter != '') {
      query = query.gte('date', req.query.flownAfter)
      }
  try{
    const logs =  await query.exec()
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
  console.log(log)
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