const {Router} = require('express');
const {userService} = require('../services');
const config = require('../config/config');
const {msg} = require('../config/constants');
const {isGuest, isLogged, validate} = require('../middlewares');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('users/login',);
});

router.post('/login', isGuest, validate.user.login, (req, res) => {

    userService.login(req.body)
        .then((token) => {
            if (!token) {
                throw {message: msg.WRONG_CREDENTIALS};
            }
            const cookieOptions = {maxAge: 1000 * 60 * 60, httpOnly: true}
            res.cookie(config.authCookie, token, cookieOptions);
            return res.redirect('/');
        })
        .catch((error) => {
            res.render('users/login', {message: error.message});
        });
});

router.get('/register', isGuest, (req, res) => {
    res.render('users/register');
});

router.post('/register', isGuest, validate.user.register, (req, res) => {
    userService.register(req.body)
        .then(() => {
            return userService.login(req.body);
        })
        .then((token) => {
            if (!token) {
                throw {message: msg.WRONG_CREDENTIALS};
            }
            const cookieOptions = {maxAge: 1000 * 60 * 60, httpOnly: true}
            res.cookie(config.authCookie, token, cookieOptions);
            return res.redirect('/');
        })
        .catch(error => {
            res.render('users/register', {message: error.message});
        });
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(config.authCookie);
    res.redirect('/users/login');
});

router.get('/profile', isLogged, (req, res, next) => {
    const userId = req.user.id;
    userService.getById(userId)
        .then((user) => {
            res.render('users/profile', {...user, username: res.locals.username});
        })
        .catch(next);
});

router.post('/fill', isLogged, (req, res, next) => {
    userService.reFill(req.user.id, req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

module.exports = router;
