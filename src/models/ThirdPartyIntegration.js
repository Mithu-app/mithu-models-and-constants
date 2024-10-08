"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, THIRD_PARTY_TYPES } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        access_token: {
            type: String,
            required: true
        },
        business_reference: {
            type: String,
            required: true
        },
        refresh_token: {
            type: String,
            required: true
        },
        merchant_id: {
            type: Schema.ObjectId,
            ref: NAME.MERCHANT,
            required: true
        },
        type: {
            type: String,
            enum: Object.values(THIRD_PARTY_TYPES),
            required: true
        }
    },
    {
        collection: COLLECTION.THIRD_PARTY_INTEGRATION,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(thirdPartyIntegration) {
        const { _id, access_token, business_reference, refresh_token, merchant_id, type, created_at, updated_at } = thirdPartyIntegration;
        return {
            id: _id,
            access_token,
            business_reference,
            refresh_token,
            merchant_id,
            type,
            created_at,
            updated_at
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "access_token",
            "business_reference",
            "refresh_token",
            "merchant_id",
            "type",
            "created_at",
            "updated_at"

        ];
    }
};

SCHEMA.methods = {
    serialize() {
        return this.constructor.serialize(this);
    }
};

SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.THIRD_PARTY_INTEGRATION, SCHEMA);

module.exports = MODEL;
