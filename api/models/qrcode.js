const mongoose = require('mongoose');

const qrcodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    qrcode: String,
    begin: Date,
    end: Date,
    created_at: Date,
});

module.exports = mongoose.model('Qrcode', qrcodeSchema);
