var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('job', { 
      user : req.user,
      ownsPost : true
  }, function(err, ejs) { 
      if (err) res.send(err);
  });
});

module.exports = router;