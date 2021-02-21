const {Expense, User} = require('../models');

function getById(expenseId) {
    return Expense
        .findById(expenseId).lean()
        .map(x => {
            x.total = x.total.toFixed(2);
            return x;
        });
}

function getAll(userId) {
    return Expense
        .find({user: userId})
        .lean();
}

function remove(expenseId) {
    return Expense.findByIdAndDelete(expenseId);
}

function create(data, userId) {

    let {merchant, total, category, description, report} = data;
    report = !!report;

    return User.findById(userId)
        .then(user => {
            const expense = new Expense({merchant, total, category, description, report, user: userId});
            return Promise.all([user, expense.save()]);
        }).then(([u, e]) => {
            u.expenses.push(e._id);
            return u.save();
        });

}

module.exports = {
    getById,
    getAll,
    create,
    remove,
}
