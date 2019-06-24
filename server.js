const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db;

MongoClient.connect('mongodb+srv://mongozb_user:mongozb_pass@star-war-quotes-yko74.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-war-quotes')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
    app.get('/', (req, res) => {
        res.sendFile('/Users/alexizbas/Documents/GoDevelopment' + '/index.html')
    });
    app.get('/collections', (req, res) => {
      db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
      })
    })
    app.post('/quotes', (req, res) => {
        db.collection('quotes').insertOne(req.body, (err, result) => {
          if (err) return console.log(err)
      
          console.log('saved to database')
          res.redirect('/')
        })
      })
});

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


