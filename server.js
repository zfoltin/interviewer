'use strict';

var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

let initialTransactions = [{
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
let initialBalance = 250 - 35.25 - 12.5 - 5.99 - 3.99;
let accounts = {};

app.use((req, res, next) => {
  if (req.url !== '/login') {
    req.user = accounts[req.get('Authorization').substring(7)];
    if (!req.user) {
      res.status(401).send();
      return;
    }
  }
  if (!req.accepts('application/json')) {
    res.status(406).send();
    return;
  }
  next();
});


// Endpoints

app.get('/login', (req, res) => {
  if (!req.accepts('application/json')) {
    res.status(406).send();
    return false;
  }
  let token = Math.random().toString(36).replace(/[^a-z]+/g, '');
  accounts[token] = {
    balance: initialBalance,
    transactions: initialTransactions
  };
  res.status(200).json({
    'token': token
  });
});

app.get('/transactions', (req, res) => {
  let delay = Math.random() * 1000 + 200;
  setTimeout(() => {
    res.status(200).json(req.user.transactions);
  }, delay);
});

app.get('/balance', (req, res) => {
  res.status(200).json({
    'balance': "" + (Math.round(req.user.balance * 100) / 100).toFixed(2),
    'currency': 'GBP'
  });
});

app.post('/spend', (req, res) => {
  let amount = parseFloat(req.body.amount) || 0;
  if (amount > 0 && req.user.balance - amount >= 0) {
    req.user.balance -= amount;
    res.status(204).send();
  } else {
    res.status(406).send();
  }
});

var server = app.listen(process.env.PORT || 8080, () => {
  var port = server.address().port;
  console.log('App now running on port', port);
});
