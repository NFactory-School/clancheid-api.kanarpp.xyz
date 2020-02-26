const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    pseudo: { type: String, required: true, unique: true },
    name: String,
    firstname: String,
    phone: String,
    qrcode: String,
    role: Number,
    vector: String,
    file: { type: String, required: true },
    created_at: Date,
    update_at: Date
});

module.exports = mongoose.model('User', userSchema);
