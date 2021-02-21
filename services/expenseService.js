const {Expense} = require('../models');

function remove(expenseId) {
    return Expense.findByIdAndDelete(expenseId);
}

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

function create(data, userId) {

    let {merchant, total, category, description, report} = data;
    report = !!report;

    const expense = new Expense({merchant, total, category, description, report, user: userId});
    return expense.save();
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
}
