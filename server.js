'use strict';

var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello from Interviewer Api!');
});

app.get('/transactions', function (req, res) {
  // validate req headers (authorization, accept)
  if (req.get('Authorization') !== 'Bearer l5lm6oblmjs4wmjkdmeg7talt8c0hy56uh9rn6quzy9uhoo2') {
    res.status(401).send();
    return;
  }
  if (!req.accepts('application/json')) {
    res.status(406).send();
    return;
  }

  let transactions = [{
      'id': '123',
      'date': '2016-12-11T12:23:34Z',
      'description': 'A bag of spanners',
      'amount': '35.25',
      'currency': 'GBP'
    },{
      'id': '124',
      'date': '2016-12-12T01:58:59Z',
      'description': 'Hot chocholate',
      'amount': '12.50',
      'currency': 'GBP'
    },{
      'id': '125',
      'date': '2016-12-12T06:11:06Z',
      'description': 'Subscriptions - Magazine',
      'amount': '5.99',
      'currency': 'GBP'
    },{
      'id': '126',
      'date': '2016-12-13T10:03:17Z',
      'description': 'Movie rental',
      'amount': '3.99',
      'currency': 'GBP'
    }];
  res.status(200).json(transactions);
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});
