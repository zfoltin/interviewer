'use strict';

var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

let initialTransactions = [{
    id: '123',
    date: '2016-12-11T12:23:34Z',
    description: 'A bag of spanners',
    amount: '35.25',
    currency: 'GBP'
  },{
    id: '124',
    date: '2016-12-12T01:58:59Z',
    description: 'Hot chocholate',
    amount: '12.50',
    currency: 'GBP'
  },{
    id: '125',
    date: '2016-12-12T06:11:06Z',
    description: 'Subscriptions - Magazine',
    amount: '5.99',
    currency: 'GBP'
  },{
    id: '126',
    date: '2016-12-13T10:03:17Z',
    description: 'Movie rental',
    amount: '3.99',
    currency: 'GBP'
  }];
let initialBalance = 192.27;
let accounts = {};


// Auth & checking request headers
//////////////////////////////////
app.use((req, res, next) => {
  req.user = req.get('Authorization') ? accounts[req.get('Authorization').substring(7)] : null;
  let isNotAuthorised = ['/', '/login'].indexOf(req.path) === -1 && !req.user;
  let headerError = !req.accepts('application/json') || (req.method === 'POST' && !req.is('json'));

  if (isNotAuthorised) {
    res.status(401).send();
  } else if (headerError) {
    res.status(406).send();
  } else {
   next();
  }
});


// Endpoints
////////////
app.get('/', (req, res) => {
  res.send('Interviewer says hello! 👋');
});

app.get('/login', (req, res) => {
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
  let canSpend = amount > 0 && ((req.user.balance * 100) / 100) - ((amount * 100) / 100) >= 0;
  // TODO: more input validation

  if (canSpend) {
    let transactions = req.user.transactions;
    transactions.push({
      id: parseInt(transactions[transactions.length - 1].id) + 1 + "",
      date: req.body.date,
      description: req.body.description,
      amount: amount.toFixed(2),
      currency: req.body.currency
    });
    req.user.balance -= amount;
    res.status(204).send();
  } else {
    res.status(406).send();
  }
});


// start listening
var server = app.listen(process.env.PORT || 8080, () => {
  var port = server.address().port;
  console.log('App now running on port', port);
});
