const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {msg} = require('../config/constants');

function getById(userId) {

    // return User.aggregate([{
    //     $project: {
    //         username: 1, amount: 1, expenses: 1,
    //         expensesCount: {
    //             $size: '$expenses'
    //         },
    //         totalAmount: {
    //             $sum: '$expenses.total'
    //         }
    //     }
    // }]);


    return User
        .findById(userId)
        .populate('expenses')
        .lean()
        .map((x) => {
            x.totalAmount = x.expenses.reduce((acc, value) => {
                acc += Number(value.total);
                return acc;
            }, 0).toFixed(2);
            x.amount = x.amount.toFixed(2);
            return x;
        });

}

function reFill(userId, data) {
    const {amount} = data;
    return User.findById(userId)
        .then((user) => {
            user.amount += Number(amount);
            return user.save();
        });
}

function register(data) {
    let {username, password, amount} = data;
    username = username.toLowerCase().trim();
    amount = Number(amount);

    return User.findOne({username})
        .then((user) => {
            if (user) {
                throw {message: msg.USERNAME_IS_IN_USE(username)}
            }
            return new User({username, password, amount}).save();
        });
}

function login(data) {

    let {username, password} = data;
    username = username.toLowerCase().trim();

    return User.findOne({username})
        .then((user) => {
            if (user) {
                return Promise.all([user.comparePasswords(password), user])
            }
            return [false];
        })
        .then(([passwordMatches, user]) => {
            if (passwordMatches) {
                return jwt.sign({id: user._id, username: data.username}, config.privateKey, {expiresIn: "1h"});
            } else {
                return null;
            }
        });
}

module.exports = {
    getById,
    register,
    login,
    reFill,
}
