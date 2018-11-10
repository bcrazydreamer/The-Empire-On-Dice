var express               = require('express');
var router                = express.Router();
var session               = require('express-session');
var bodyParser            = require('body-parser');
var path                  = require('path');

router.get('/',function(req, res, next) {
    res.render('index', { title: 'Game'});
});
//-------------------------------------------------------------------------------------------------------------------
// router.post('/',function (req, res) {
//   if(req.session.passport.user.role=="admin" || req.session.passport.user.role=="superadmin"){
//         res.redirect('/Admin/Profile');
//   }else {
//         res.redirect('/community/communitypanel');
//         //res.redirect('/Profile');
//   }
// });

module.exports = router;
