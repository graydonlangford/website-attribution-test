var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

app.post('/forms', (req, res)=>{
  // req.client = ''
  // req._parsedUrl = ''
  // req.res = ''
  // req.connection = ''
  console.log(req.body)
  res.end()
})

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!')
})