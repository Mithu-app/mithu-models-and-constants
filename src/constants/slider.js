const { MODEL } = require('./model')

const SLIDER_STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

const SLIDER_TYPE = {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    COMMON: 'common',
}

const SLIDER_ENTITY_TYPES = {
    ...MODEL,
    APPLE : "Apple"
}
module.exports = {
    SLIDER_STATUS,
    SLIDER_TYPE,
    SLIDER_ENTITY_TYPES
}