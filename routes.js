const express = require('express')
const router = express.Router()
const data = require('./data.json')
const fs = require('fs')
module.exports = router

router.get('/', (req, res) => {

  res.render('home')
})

//--------------
//Poll Page
//--------------

router.get('/poll', (req, res) => {

  res.render('poll', data)
})

router.post('/poll', (req, res) => {

  var keys = Object.keys(req.body)

  for (let i = 0; i < data.meals.length; i++) {
    var chosenMeal = keys.find(key => key == data.meals[i].name)

    if (chosenMeal) {
      var voters = data.meals[i].voters
      var asVoted = voters.find(voter => voter == req.body.name)
      if(!asVoted) {
        voters.push(req.body.name)
      }
    }
  }

  fs.writeFile('./data.json', JSON.stringify(data), function (err) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    res.render('results', data)
  })
})


//--------------
//Results Page
//--------------
router.get('/results', (req, res) => {
  res.render('results', data)
})

router.post('/results', (req, res) => {

  for (let i = 0; i < data.meals.length; i++) {
    data.meals[i].voters = [];
  }
    
  fs.writeFile('./data.json', JSON.stringify(data), function (err) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    res.render('results', data)
  })
})

//--------------
//Add meal Page
//--------------

router.get('/add-meal', (req, res) => {
    res.render('add-meal', data)
})