const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('../middlewares');

module.exports = (app) => {
    app.engine('hbs', handlebars({extname: 'hbs'}));
    app.set('view engine', 'hbs');
    app.use(express.static('static'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(isAuthenticated());
};