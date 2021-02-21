const {Router} = require('express');
const {expenseService} = require('../services');

const router = Router();

router.get('/', (req, res, next) => {
    expenseService.getAll()
        .then((expenses) => {
            console.log(expenses);
            res.render('home/home', {expenses});
        })
        .catch(next);
});

module.exports = router;
