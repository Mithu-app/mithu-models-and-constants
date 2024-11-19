"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true
        },
        merchantId: {
            type: Schema.Types.ObjectId,
            ref: NAME.MERCHANT,
        },
        reference_id: {
            type: Schema.Types.ObjectId,
        },
        reference_type: {
            type: String,
            enum: Object.values(COLLECTION),
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: NAME.BRAND,
        },
        balance: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        collection: COLLECTION.CUSTOMER_BALANCES,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(customerBalance) {
        const { _id, customerId, merchantId, reference_id, reference_type, brandId, balance } = customerBalance;

        return {
            id: _id,
            customerId,
            reference_id,
            reference_type,
            merchantId,
            brandId,
            balance
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customerId",
            "merchantId",
            "brandId",
            "reference_id",
            "reference_type",
            "balance"
        ];
    },
});

SCHEMA.method({
    serialize() {
        return this.constructor.serialize(this);
    },
});

SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.CUSTOMER_BALANCES, SCHEMA);

module.exports = MODEL;
