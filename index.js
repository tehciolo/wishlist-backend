const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require("./routes/routes.js");
const mongoose = require('mongoose')
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

routes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
