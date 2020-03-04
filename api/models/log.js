const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    pseudo: { type: String, required: true },
    method: { type: String, required: true },
    created_at: Date,
});

module.exports = mongoose.model('Log', logSchema);