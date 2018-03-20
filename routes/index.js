var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home');
});

router.get('/about', function(req, res, next) {
	res.render('partials/aboutus');
});

router.get('/products', function(req, res, next) {
	res.render('partials/products');
});

router.get('/services', function(req, res, next) {
	res.render('partials/services');
});

router.get('/contact', function(req, res, next) {
	res.render('partials/contactus');
});
module.exports = router;
