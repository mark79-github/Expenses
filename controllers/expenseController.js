const {Router} = require('express');
const {expenseService} = require('../services');
const {User} = require('../models');
const {validate} = require('../middlewares');

const router = Router();

router.get('/create', (req, res) => {
    res.render('expenses/create');
});

router.post('/create', validate.expense.create, (req, res, next) => {

        const userId = req.user.id;
        expenseService.create(req.body, userId)
            .then((expense) => {
                return User.updateOne({_id: userId}, {$push: {expenses: expense._id}});
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);

    }
);

router.get('/details/:expenseId', (req, res, next) => {
    const expenseId = req.params.expenseId;
    expenseService.getById(expenseId)
        .then((expense) => {
            res.render('expenses/details', {...expense});
        })
        .catch(next);
});

router.get('/delete/:expenseId', (req, res, next) => {
    const expenseId = req.params.expenseId;
    expenseService.remove(expenseId)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

module.exports = router;