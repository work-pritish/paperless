var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
var form = require('../models/form');

router.get('/', (req, res) => {
  res.render('front');
});

router.get('/home', authMiddleware.loginRequired, function(req, res, next) {
  form.findOne({user_id : req.user._id})
  .then((data) => {
    if(data) 
    return res.render('Nuser/userForm',{"user": req.user, "checker": 1, "data": data});  
    else
    return res.render('Nuser/userForm',{"user": req.user, "checker": 0});
  })
  .catch((err) => {
    console.log("error occured ", err);
  });
  });



module.exports = router;
