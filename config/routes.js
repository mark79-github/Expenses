const {Router} = require('express');
const router = Router();

const {userController, homeController, expenseController, errorController} = require('../controllers');
const {isLogged} = require('../middlewares');

router.use('/', homeController);
router.use('/users', userController);
router.use('/expenses', isLogged, expenseController);
router.use('*', errorController);

module.exports = router;
