const mongoose = require('mongoose');

const printerDump = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    received_at: {
        type: Date,
        default: Date.now
    }
});

const WebhookDump = mongoose.model('PrinterDump', printerDump);

module.exports = WebhookDump;

