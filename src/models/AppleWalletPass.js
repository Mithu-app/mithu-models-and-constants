"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    PASS_TYPES
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true,
        },
        type : {
            enum : Object.values(PASS_TYPES),
            type : String,
            default : PASS_TYPES.MITHU_LOYALTY_PASS,
            required : true,
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
        pass_type_identifier: {
            type: String,
            required: true,
        },
        device_library_identifier: {
            type: String,
        },
        push_token: {
            type: String,
        },
        authentication_token: {
            type: String,
        },
        encryption_public_key: {
            type: String,
        },
        webservice_url: {
            type: String,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        last_updated_from_server: {
            type: Date,
        },
    },
    {
        collection: COLLECTION.APPLE_WALLET_PASS,
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
            pass_type_identifier,
            device_library_identifier,
            pass_url,
            push_token,
            authentication_token,
            encryption_public_key,
            webservice_url,
            is_active,
            last_updated_from_server,
            created_at,
            updated_at,
        } = pass;
        return {
            id: _id,
            customer_id,
            serial_number,
            pass_type_identifier,
            pass_url,
            device_library_identifier,
            push_token,
            authentication_token,
            encryption_public_key,
            webservice_url,
            is_active,
            last_updated_from_server,
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
            "pass_type_identifier",
            "device_library_identifier",
            "push_token",
            "authentication_token",
            "encryption_public_key",
            "webservice_url",
            "is_active",
            "last_updated_from_server",
            "created_at",
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

const MODEL = model(NAME.APPLE_WALLET_PASS, SCHEMA);

module.exports = MODEL;
