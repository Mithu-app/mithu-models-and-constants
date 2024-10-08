const mongoose = require('mongoose');

const webhookDumpSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    received_at: {
        type: Date,
        default: Date.now
    }
});

const WebhookDump = mongoose.model('WebhookDump', webhookDumpSchema);

module.exports = WebhookDump;

