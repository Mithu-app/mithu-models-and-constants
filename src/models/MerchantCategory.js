"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    MERCHANT_CATEGORY_STATUS
} = require("@src/constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {

        merchant_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref : NAME.MERCHANT
        },
        name: {
            type: String,
            required: true,
        },
        status : {
            type : String,
            enum : Object.values(MERCHANT_CATEGORY_STATUS),
            default : MERCHANT_CATEGORY_STATUS.ACTIVE
        },
        deleted_at: {
            type: Date,
        },
    },
    {
        collection: COLLECTION.MERCHANT_CATEGORY,
        timestamps: TIMESTAMPS,
    }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize merchant_category object.
     *
     * @memberOf MODEL
     * @param {Object} merchant_category
     * @returns {Object}
     */
    serialize(merchant_category) {
        const { id, merchant_id, name, status, created_at, updated_at } =
            merchant_category;

        const serialized = {
            id,
        };

        serialized.name = name;
        serialized.merchant_id = merchant_id;
        serialized.created_at = created_at;
        serialized.updated_at = updated_at;
        serialized.status = status;

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
            "merchant_id",
            "name",
            "status",
            "created_at",
            "updated_at",
        ];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize merchant_category object.
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
     * Serialize merchant_category object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.MERCHANT_CATEGORY, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
