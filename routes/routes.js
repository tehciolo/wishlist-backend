const Wish = require('../models/wish')

const appRouter = function (app) {
  app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  app.get('/wishes', function (req, res) {
    Wish.find(function (err, wishes) {
      if (err) return console.error(err);
      res.json(wishes)
    })
  })

  app.post('/wishes', function (req, res) {
    let wish = new Wish();
    wish.description = req.body.description;
    wish.price = req.body.price;
    wish.purchased = req.body.purchased;

    wish.save()
      .then(function() {
        res.json({ message: 'Wish created!' });
      })
      .catch(function(err) {
        res.send(err);
      });
  })
}

module.exports = appRouter;