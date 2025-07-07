"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    PASS_TYPES
} = require("../constants");
const { Schema, model, deleteModel } = require("mongoose");

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true,
        },
        type: {
            enum: Object.values(PASS_TYPES),
            type: String,
            default: PASS_TYPES.MITHU_LOYALTY_PASS,
            required: true,
        },
        serial_number: {
            type: String,
            required: true,
            unique: true,
        },
        pass_url: {
            type: String,
            required: true,
            unique: true,
        },
        class_id: {
            type: String,
            required: true,
        },
        object_id: {
            type: String,
        },
        token: {
            type: String,
        },
        callback_url: {
            type: String,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        last_updated_from_server: {
            type: Date,
        },
        is_registered: { // if registered in apple wallet then this will be true
            type: Boolean,
            default: false,
        },
        is_deleted: { // if removes by customer from apple wallet then this will be true
            type: Boolean,
            default: false,
        },
        deleted_at: { // time when user removes the pass from apple wallet
            type: Date,
        },
    },
    {
        collection: COLLECTION.GOOGLE_WALLET_PASS,
        timestamps: TIMESTAMPS,
    }
);

// Static methods
SCHEMA.statics = {
    serialize(pass) {
        const {
            _id,
            customer_id,
            serial_number,
            class_id,
            object_id,
            pass_url,
            token,
            callback_url,
            is_active,
            last_updated_from_server,
            is_registered,
            is_deleted,
            deleted_at,
            created_at,
            updated_at,
        } = pass;
        return {
            id: _id,
            customer_id,
            serial_number,
            class_id,
            pass_url,
            object_id,
            token,
            callback_url,
            is_active,
            last_updated_from_server,
            is_registered,
            is_deleted,
            deleted_at,
            created_at,
            updated_at,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customer_id",
            "serial_number",
            "pass_url",
            "class_id",
            "object_id",
            "token",
            "callback_url",
            "is_active",
            "last_updated_from_server",
            "created_at",
            "is_registered",
            "is_deleted",
            "deleted_at",
            "updated_at",
        ];
    },
};

// Instance methods
SCHEMA.methods = {
    serialize() {
        return this.constructor.serialize(this);
    },
};

// Customize JSON output
SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.GOOGLE_WALLET_PASS, SCHEMA);

module.exports = MODEL;
