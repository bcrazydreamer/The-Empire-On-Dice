var express               = require('express');
var router                = express.Router();
var session               = require('express-session');
var bodyParser            = require('body-parser');
var path                  = require('path');

router.get('/',function(req, res, next) {
    res.render('Index', { title: 'Game'});
});
router.get('/googlec2ef99614e6df793.html',function(req, res, next) {
    res.sendFile('SEO/googlec2ef99614e6df793.html',{ root: './public' });
});
router.get('/sitemap2018game',function(req, res, next) {
    res.sendFile('SEO/sitemap.xml',{ root: './public' });
});

module.exports = router;
