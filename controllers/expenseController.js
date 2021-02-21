const {Router} = require('express');
const {expenseService} = require('../services');

const router = Router();

router.get('/create', (req, res) => {
    res.render('expenses/create');
});

router.post('/create', (req, res, next) => {

    console.log(req.body);

    expenseService.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

router.get('/details/:expenseId', (req, res, next) => {
    const expenseId = req.params.expenseId;
    expenseService.getById(expenseId)
        .then((expense) => {
            res.render('expenses/details', {...expense});
        })
        .catch(next);
    res.render('expenses/create');
});

module.exports = router;