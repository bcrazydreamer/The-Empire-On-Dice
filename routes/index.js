var express               = require('express');
var router                = express.Router();
var session               = require('express-session');
var bodyParser            = require('body-parser');
var path                  = require('path');

router.get('/',function(req, res, next) {
    res.render('Index', { title: 'Game'});
});

router.get('/sitemap2018game',function(req, res, next) {
    res.sendFile('SEO/sitemap.xml',{ root: './public' });
});

router.get('/robot.txt',function(req, res, next) {
    res.sendFile('SEO/robot.txt',{ root: './public' });
});

router.get('/sitemap2018game',function(req, res, next) {
    res.sendFile('SEO/sitemap.xml',{ root: './public' });
});

module.exports = router;
