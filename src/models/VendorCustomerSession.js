"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, VENDOR_CUSTOMER_SESSION_STATUS } = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER
        },
        device_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.DEVICE
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.MERCHANT
        },
        status: {
            type: String,
            enum: Object.values(VENDOR_CUSTOMER_SESSION_STATUS),
            default: VENDOR_CUSTOMER_SESSION_STATUS.ACTIVE
        },
        allow_redeem: {
            type: Boolean,
            default: false
        },
        exipres_at:{
            type: Date,
            required: false,
        },
        amount: {
            type: Number,
            required: false,
        },
        deleted_at: {
            type: Date
        },
    },
    {
        collection: COLLECTION.VENDOR_CUSTOMER_SESSION,
        timestamps: TIMESTAMPS,
    },
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize vendor_customer_session object.
     *
     * @memberOf MODEL
     * @param {Object} vendor_customer_session
     * @returns {Object}
     */
    serialize(vendor_customer_session) {
        const { id, merchant_id,device_id,amount,exipres_at, customer_id, status, allow_redeem, created_at, updated_at } = vendor_customer_session;

        const serialized = {
            id,
            device_id,
            merchant_id,
            customer_id,
            amount,
            exipres_at,
            status,
            allow_redeem,
            created_at,
            updated_at,

        };

        return serialized;
    },

    /**
     * Returns fields that can be selected by query parameters.
     *
     * @returns {string[]}
     */
    getSelectableFields() {
        return ["id", "device_id", "customer_id", "status", "created_at", "updated_at", "allow_redeem"];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize vendor_customer_session object.
     *
     * @memberOf SCHEMA.prototype
     * @returns {Object}
     */
    serialize() {
        return MODEL.serialize(this);
    },
});

// ------------------------- Settings ---------------------------

SCHEMA.set("toJSON", {
    /**
     * Serialize vendor_customer_session object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.VENDOR_CUSTOMER_SESSION, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
