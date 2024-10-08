"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("@src/constants");
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
            required: true
        },
        balance: {
            type: Number,
            required: true,
            default : 0
        }
    },
    {
        collection: COLLECTION.CUSTOMER_BALANCES,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(customerBalance) {
        const { _id, customerId, merchantId, balance } = customerBalance;

        return {
            id: _id,
            customerId,
            merchantId,
            balance
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customerId",
            "merchantId",
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
