"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    TRANSACTION_SOURCE_NAME,
    TRANSACTION_SOURCE_TYPE,
    TRANSACTION_TYPE
} = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            enum: Object.values(TRANSACTION_SOURCE_NAME),
            required: true,
        },
        earning_type: {
            type: String,
            enum: Object.values(TRANSACTION_TYPE),
            required: true,
        },
        transaction_type: {
            type: String,
            enum: Object.values(TRANSACTION_SOURCE_TYPE),
            required: true,
        },
        deleted_at: {
            type: Date,
        },
    },
    {
        collection: COLLECTION.TRANSACTION_SOURCES,
        timestamps: TIMESTAMPS,
    }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize currency object.
     *
     * @memberOf MODEL
     * @param {Object} currency
     * @returns {Object}
     */
    serialize(currency) {
        const { id, transaction_type, earning_type, name, created_at, updated_at } =
            currency;

        const serialized = {
            id,
        };

        serialized.name = name;
        serialized.earning_type = earning_type;
        serialized.transaction_type = transaction_type;
        serialized.created_at = created_at;
        serialized.updated_at = updated_at;

        return serialized;
    },

    /**
     * Returns fields that can be selected by query parameters.
     *
     * @returns {string[]}
     */
    getSelectableFields() {
        return [
            "id",
            "transaction_type",
            "earning_type",
            "name",
            "created_at",
            "updated_at",
        ];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize currency object.
     *
     * @memberOf SCHEMA.prototype
     * @returns {Object}
     */
    serialize() {
        return MODEL.serialize(this);
    },
});

// ------------------------- Relations --------------------------

// ------------------------- Settings ---------------------------

SCHEMA.set("toJSON", {
    /**
     * Serialize currency object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.TRANSACTION_SOURCES, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
