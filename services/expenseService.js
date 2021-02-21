const {Expense} = require('../models');

function getById(expenseId) {
    return Expense.findById(expenseId).lean();
}

function getAll() {
    return Expense.find({}).lean();
}

function create(data) {
    let {merchant, total, category, description, report} = data;
    report = Boolean(report);

    const expense = new Expense({merchant, total, category, description, report});
    return expense.save();
}

module.exports = {
    create,
    getAll,
    getById
}
