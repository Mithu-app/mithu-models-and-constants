const QUEUE_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    STOPPED: 'stopped'
}
const WHATSAPP_STATUS = {
    READ: 'read',
    DELIVERED: 'delivered',
    PENDING: 'pending',
}
const QUEUE_RECORD_STATUS = {
    VALID: 'pending',
    INVALID: 'invalid',
    SUCCESS: 'success' // means msg has been sent to user's phone number
}

const QUEUE_TYPE = {
    WHATSAPP: 'whatsapp',
}

module.exports = {
    QUEUE_STATUS,
    QUEUE_RECORD_STATUS,
    QUEUE_TYPE,
    WHATSAPP_STATUS
}