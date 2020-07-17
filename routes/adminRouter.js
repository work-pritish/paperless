var express = require("express");
var router = express.Router();
var QRCode = require('qrcode')
const authMiddleware = require('../middlewares/auth');
var form = require('../models/form');

router.get('/qr', authMiddleware.loginRequired, (req, res) => {
    form.findOne({ user_id: req.user._id })
        .then((data) => {
            if (data) {
                QRCode.toString(`/findQR/${data.id}`, { type: 'svg' }, function (err, url) {
                    res.send(url);
                });
            }
            else
            {
                res.send("QR not generated yet");
            }
        })
        .catch((err) => {
            console.log("error occured : ", err);
        });

});

router.get('/scanner', (req, res) => {
    res.render('qrcode');
});

router.get('/findQR/:id', (req, res) => {
    form.findOne({_id: req.params.id})
    .then((data) => {
        res.render("admin", {"data": data});
    })
    .catch((err) => {
        res.send("error occured during finding data: ", err);
    });
});

router.get('/admin', (req, res) => {
    res.render('adminFront');
});

module.exports = router;