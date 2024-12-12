const QUEUE_STATUS = {
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    STOPPED: 'stopped'
}
const QUEUE_RECORD_STATUS = {
    VALID: 'pending',
    INVALID: 'invalid',
    SUCCUESS: 'success' // means msg has been sent to user's phone number
}

const QUEUE_TYPE = {
    WHATSAPP: 'whatsapp',
}

module.exports = {
    QUEUE_STATUS,
    QUEUE_RECORD_STATUS,
    QUEUE_TYPE
}