const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router();
const mongoose = require('mongoose')
const Wish = require('./models/wish')
const mongoDB = 'mongodb://tehciolo:test@ds239029.mlab.com:39029/wishlist-backend'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
  console.log('Connection to db successful')
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/wishes', function (req, res) {
  Wish.find(function (err, wishes) {
    if (err) return console.error(err);
    res.json(wishes)
  })
})

router.post('/wishes', function (req, res) {
  let wish = new Wish();
  wish.description = req.body.description;
  wish.price = req.body.price;
  wish.purchased = req.body.purchased;

  wish.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Wish created!' });
  });
})

app.use('/', router);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
