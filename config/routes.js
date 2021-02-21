const {Router} = require('express');
const router = Router();

const {userController, homeController, expenseController, errorController} = require('../controllers');

router.use('/', homeController);
router.use('/users', userController);
router.use('/expenses', expenseController);
router.use('*', errorController);

module.exports = router;
