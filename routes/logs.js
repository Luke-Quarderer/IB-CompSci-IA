const express = require('express')
const router = express.Router()
const Log = require('../models/log')
const { render } = require('ejs')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
const db = mongoose.connection


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
})

async function renderNewPage(res, log, hasError = false){
  try {
    const params = {
      log: log
    }
    //validating input 
    if(hasError) params.errorMessage = 'Error Creating Log'
    res.render('logs/new', params)
  } catch {
    res.redirect('/logs')
  }
}

//Edit Log Route
router.get('/:id/edit', async  (req,res) => {
  try{
      const log = await Log.findById(req.params.id)
      res.render('logs/edit', {log: log})
  }
  catch{
      res.redirect('/logs')
  }
})

router.put('/:id', async (req, res) => {

  try {
    // Find the log by ID and update it with the request body data
    const log = await Log.findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        timeFlown: req.body.timeFlown,
        vfrIFR: req.body.vfrIFR,
        createdAt: req.body.createdAt,
        conditions: req.body.conditions,
        solo: req.body.solo,
        tailNo: req.body.tailNo,
        instructorLicense: req.body.instructorLicense
      },
      { new: true } // Return the updated document
    );

    // If log is not found, redirect to the home page
    if (!log) {
      return res.redirect('/');
    }

    // Redirect to the logs page
    res.redirect('/logs');

    // Log the updated information for debugging
    console.log(log.tailNo);
    console.log(log.id);
    console.log(req.body.tailNo);
  } catch (error) {
    // Log the error information for debugging
    console.error(error);

    // If an error occurs, render the edit page with an error message
    res.render('logs/edit', {
      log: log,
      errorMessage: 'Error updating log'
    });
  }
  //let log
  //const log = await Log.findById(req.params.id)
  //try{
      /* 
      log  = await Log.findById(req.params.id)
      log.date = req.body.date
      log.timeFlown = req.body.timeFlown
      log.vfrIFR = req.body.vfrIFR
      log.createdAt = req.body.createdAt
      log.conditions = req.body.conditions
      log.solo = req.body.solo
      log.tailNo = req.body.tailNo
      log.instructorLicense = req.body.instructorLicense
      */
     //const filter = {_id : log.id}
     //const newValues = {$set: {date: req.body.date, timeFlown: req.body.timeFlown, vfrIFR: req.body.vfrIFR, createdAt: req.body.createdAt, conditions: req.body.conditions, solo: req.body.solo, tailNo: req.body.tailNo, instructorLicense: req.body.instructorLicense}}
     //db.logCollection.updateOne(filter , newValues)
    
     
    /*  Log.findByIdAndUpdate(log.id, {tailNo : req.body.tailNo})
      //await log.save()
      res.redirect('/logs')
      console.log(log.tailNo)
      console.log(log.id)
      console.log(req.body.tailNo)

  } catch {
      console.log(log.tailNo)
      console.log(log.id)
      console.log(req.body.tailNo)
      if(log == null){
          res.redirect('/')
      }
      res.render('logs/edit', {
          log: log, 
          errorMessage: 'Error updating log'
      })
    
  }   */
})

//Delete Log Route
router.delete('/:id',async (req, res) => {
  let log

  try {
      await Log.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
      })
      console.log(log)
      //await log.remove()
      res.redirect('/logs') 
  }
  catch{
          res.redirect('/')
    
}
})


module.exports = router  