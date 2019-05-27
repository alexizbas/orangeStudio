const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();


let db;
MongoClient.connect('mongodb+srv://mongozb_user:mongozb_pass@star-war-quotes-yko74.mongodb.net/test?retryWrites=true', (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-war-quotes')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })

    app.get('/', (req, res) => {
        res.sendFile('/Users/alexizbas/Documents/GoDevelopment' + '/index.html')
    });

    app.post('/quotes', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
          if (err) return console.log(err)
      
          console.log('saved to database')
          res.redirect('/')
        })
      })
})


