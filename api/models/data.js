const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    alpha: Number,
    beta: Number,
    gamma: Number,
    created_at: Date
});

module.exports = mongoose.model('Data', dataSchema);
