require('dotenv').config()

const bodyParser = require('body-parser')

let express = require('express');
let app = express();

app.use('/public', express.static(__dirname + '/public'))

app.use('/', function (req, res, next) {
   console.log(`${req.method} ${req.path} - ${req.ip}`)
   next()
}, bodyParser.urlencoded({ extended: false }))

// app.use('/', bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', function (req, res) {
   const msg = { "message": "Hello json" }

   if (process.env.MESSAGE_STYLE === 'uppercase')
   {
      msg.message = msg.message.toUpperCase()
      res.json(msg)
   } else
   {
      res.json(msg)
   }
})

app.get('/now', function (req, res, next) {
   req.time = new Date().toString()
   next()
}, function (req, res) {
   res.json({ "time": req.time })
})

app.get('/:word/echo', function (req, res) {
   res.json({ "echo": req.params.word })
})

app.route('/name')
   .get(function (req, res) {
      res.json({ "name": `${req.query.first} ${req.query.last}` })
   })
   .post(function (req, res) {
      res.json({ "name": `${req.body.first} ${req.body.last}` })
   })


module.exports = app;
