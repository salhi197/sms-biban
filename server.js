var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
var request=require('request');
const axios = require('axios');
var timeout = require('connect-timeout')

var bodyParser = require('body-parser')

app.use(timeout('10s'))

function send_sms(telephone,message,res){
  var url = 'http://sms.icosnet.com:8080/bulksms/bulksms?username=BIBAN_FRET&password=SMS3265&type=0&dlr=1&destination=213794498727&source=BIBAN%20FRET&message='+message
  axios.get(url)
  .then(function (response) {
    // handle success
    res.send("working")
  })
  .catch(function (error) {
    // handle error
    res.send("error")
  })
}
app.listen(port);
app.get('/sms', timeout('15s'),bodyParser.json(),haltOnTimedout,function(params,res){
  var telephone = params.query.telephone
  var message = params.query.message
  
  var url = 'http://sms.icosnet.com:8080/bulksms/bulksms?username=BIBAN_FRET&password=SMS3265&type=0&dlr=1&destination=213794498727&source=BIBAN%20FRET&message='+message
  axios.get(url)
  .then(function (response) {
    res.send("working")
  })
  .catch(function (error) {
    res.send("error")
  })

  
});
function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}
app.get('/', function(req, res) {
  res.send("working")
})

