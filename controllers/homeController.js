const {Router} = require('express');
const {expenseService} = require('../services');

const router = Router();

router.get('/', (req, res, next) => {

    if (req.user) {
        const userId = req.user.id;
        expenseService.getAll(userId)
            .then((expenses) => {
                expenses.forEach(x => {
                    x.total = x.total.toFixed(2);
                })
                res.render('home/home', {expenses});
            })
            .catch(next);
    } else {
        res.render('home/home',);
    }
});

module.exports = router;
