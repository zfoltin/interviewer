'use strict';

var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/transactions', function (req, res) {
  // TODO: validate requred headers (auth)

  let transactions = [{
      'id': 123,
      'date': '2016-12-11T12:23:34Z',
      'description': 'A bag of spanners',
      'amount': '35.25',
      'currency': 'GBP'
    },{
      'id': 124,
      'date': '2016-12-12T01:58:59Z',
      'description': 'Hot chocholate',
      'amount': '12.50',
      'currency': 'GBP'
    }];
  res.status(200).json(transactions);
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});
