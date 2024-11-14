"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true
        },
        store_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.STORE,
        },
        saved_at: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        collection: COLLECTION.SAVED_STORE,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(savedStore) {
        const { _id, customer_id, store_id, saved_at, created_at, updated_at } = savedStore;

        return {
            id: _id,
            customer_id,
            store_id,
            saved_at,
            created_at,
            updated_at
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customer_id",
            "store_id",
            "saved_at",
            "created_at",
            "updated_at"
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

const MODEL = model(NAME.SAVED_STORE, SCHEMA);

module.exports = MODEL;
