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
        const { _id, customerId, merchantId, brandId, balance } = customerBalance;

        return {
            id: _id,
            customerId,
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
