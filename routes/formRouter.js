var express = require('express');
var router = express.Router();
var form = require('../models/form');

router.post('/home', (req, res) => {
    var form_obj = new form({
        full_name : req.body.fullname,
        scholar : req.body.scholar,
        enr : req.body.enrol,
        user_id : req.body.user_id,
        phone : req.body.phone
    })
    form_obj.save()
    .then((data) => {
        console.log("data saved ", data);
        return res.redirect('/generate_qr');
    })
    .catch((err) => {
        console.log("error occured as ", err);
    });
});

router.get('/generate_qr', (req, res) => {
   res.render('qr_generator.ejs', {"user": req.user}); 
});

router.get('/delete_form/:id', (req, res) => {
    form.deleteOne({_id : req.params.id})
    .then((data) => {
        console.log("data deleted");
        res.redirect('/home');
    })
    .catch((err) => {
        console.log("error occur : ", err);
    });
});

router.post('/edit', (req, res) => {
    
    form.findOneAndUpdate({"user_id": req.body.user_id}, {"full_name": req.body.fullname, "scholar": req.body.scholar, "enr": req.body.enrol, "phone": req.body.phone}, {new: true, useFindAndModify: false})
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log("error occured");
    });
    res.redirect('/home');
});

module.exports = router;