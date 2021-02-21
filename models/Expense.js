const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 30,
    },
    report: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: true,
    }
});


module.exports = mongoose.model('Expense', expenseSchema);