"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, CUSTOMER_TYPES } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            enum: Object.values(CUSTOMER_TYPES),
            required: true
        },
        cashback_percent: {
            type: Number,
            required: true
        }
    },
    {
        collection: COLLECTION.CUSTOMER_TYPES,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(customerType) {
        const { _id, name, cashback_percent } = customerType;
        return {
            id: _id,
            name,
            cashback_percent
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
            "cashback_percent"
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

const MODEL = model(NAME.CUSTOMER_TYPES, SCHEMA);

module.exports = MODEL;
