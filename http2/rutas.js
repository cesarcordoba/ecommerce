var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var secret  = 'ScarlettJohanson';

router.get("/", (req, res) =>
    res.render("main/layout"))


router.get("/main/:url", (req, res) =>
    res.render("main/frags/" + req.params.url))


router.get("/user", (req, res) =>
    res.render("user/layout"))

router.get("/token", (req, res) =>
    res.redirect('/user' + jwt.sign({ id: req.user.userId}, secret, { expiresIn: '1h' })))

router.get("/user:token", (req, res) =>
    res.render("user/layout"))

router.get("/user/:url", (req, res) =>
    res.render("user/frags/" + req.params.url))

router.get("/admin", (req, res) =>
    res.render("admin/layout"))

router.get("/admin/:url", (req, res) =>
    res.render("admin/frags/" + req.params.url))

router.get("/sucursal", (req, res) =>
    res.render("sucursal/layout"))

router.get("/sucursal/:url", (req, res) =>
    res.render("sucursal/frags/" + req.params.url))

router.get("/partialssucursal/:url", (req, res) =>
    res.render("sucursal/partials/" + req.params.url))

// router.all('/:action' , (req, res) => {})

router.get("/user/:url", (req, res) =>
	res.render("main/frags/user/" + req.params.url))

router.get("/partials/:part", (req, res) =>
    res.render("partials/" + req.params.part ))

router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *");
});

module.exports = router;
