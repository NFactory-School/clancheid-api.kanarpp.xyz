const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pseudo: { type: String, required: true },
    method: { type: String, required: true },
    created_at: Date,
});

module.exports = mongoose.model('Log', logSchema);