const isGuest = require('./user/isGuest');
const isLogged = require('./user/isLogged');
const isAuthenticated = require('./user/isAuthenticated');
const validate =require('./data/validate');
const globalHandler = require('./error/globalHandler');

module.exports = {
    isAuthenticated,
    isGuest,
    isLogged,
    globalHandler,
    validate,
}
