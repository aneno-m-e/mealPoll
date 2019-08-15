const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
// const puppies = require('./data.json')

const server = express()

const port = process.env.PORT || 3000


// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use('/', routes)



module.exports = server
