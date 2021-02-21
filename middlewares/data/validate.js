const {constants, msg} = require('../../config/constants');
const {isFloat} = require('validator');

module.exports = {
    user: {
        register(req, res, next) {
            const {username, password, repeatPassword, amount} = req.body;

            let user = {
                errors: [],
            };

            if (username.trim().length === 0 || username.trim().length < constants.USERNAME_MIN_LENGTH) {
                user.errors.push(msg.USERNAME_MIN_LENGTH);
            } else {
                user.username = username.trim();
            }

            if (!constants.USERNAME_REGEX.test(username)) {
                user.errors.push(msg.USERNAME_ONLY_ALPHABETICAL);
                user.username = undefined;
            }

            if (password.trim().length === 0 || password.trim().length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            if (password !== repeatPassword) {
                user.errors.push(msg.CONFIRMATION_PASSWORD_ERROR);
            }

            if (amount.trim().length !== 0) {
                if (!isFloat(amount) || Number(amount) < 0) {
                    user.errors.push(msg.AMOUNT_INVALID);
                } else {
                    user.amount = amount;
                }
            }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/register', {...user, message: user.errors.shift()});

        },
        login(req, res, next) {
            const {username, password} = req.body;

            let user = {
                errors: [],
            };

            if (username.trim().length === 0 || username.trim().length < constants.USERNAME_MIN_LENGTH) {
                user.errors.push(msg.USERNAME_MIN_LENGTH);
            } else {
                user.username = username.trim();
            }

            if (!constants.USERNAME_REGEX.test(username)) {
                user.errors.push(msg.USERNAME_ONLY_ALPHABETICAL);
                user.username = undefined;
            }

            if (password.trim().length === 0 || password.trim().length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            // if (!constants.PASSWORD_REGEX.test(password)) {
            //     user.errors.push(msg.PASSWORD_ONLY_ALPHABETICAL);
            // }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/login', {...user, message: user.errors.shift()})
        },
    },
    expense: {
        create(req, res, next) {
            const {merchant, total, category, description} = req.body;

            let expense = {
                errors: [],
            };

            if (merchant.trim().length === 0 || merchant.trim().length < constants.MERCHANT_MIN_LENGTH) {
                expense.errors.push(msg.MERCHANT_MIN_LENGTH);
            } else {
                expense.merchant = merchant.trim();
            }

            if (!isFloat(total) || Number(total) < 0) {
                expense.errors.push(msg.TOTAL_INVALID);
            } else {
                expense.total = total;
            }

            if (!category) {
                expense.errors.push(msg.CATEGORY_INVALID);
            }else{
                expense.category = category;
            }

            if (description.trim().length === 0 || description.trim().length < constants.DESCRIPTION_MIN_LENGTH || description.trim().length > constants.DESCRIPTION_MAX_LENGTH) {
                expense.errors.push(msg.DESCRIPTION_INVALID_LENGTH);
            } else {
                expense.description = description.trim();
            }

            if (!expense.errors.length) {
                next();
                return;
            }
            res.render('expenses/create', {...expense, message: expense.errors.shift()});

        },
    }
}