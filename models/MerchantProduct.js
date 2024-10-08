                   "use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    MERCHANT_PRODUCT_STATUS
} = require("@src/constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {

        merchant_category_id: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref : NAME.MERCHANT_PRODUCT
        }],
        name: {
            type: String,
            required: true,
        },
        status : {
            type : String,
            enum : Object.values(MERCHANT_PRODUCT_STATUS),
            default : MERCHANT_PRODUCT_STATUS.ACTIVE
        },
        image : {
            type : String,
            required: true
        },
        price : {
            type : Number,
            required: true
        },
        deleted_at: {
            type: Date,
        },
    },
    {
        collection: COLLECTION.MERCHANT_PRODUCT,
        timestamps: TIMESTAMPS,
    }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize merchant_product object.
     *
     * @memberOf MODEL
     * @param {Object} merchant_product
     * @returns {Object}
     */
    serialize(merchant_product) {
        const { id, merchant_category_id, name, status, price, created_at, updated_at } =
            merchant_product;

        const serialized = {
            id,
        };

        serialized.name = name;
        serialized.merchant_category_id = merchant_category_id;
        serialized.price = price;
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
            "merchant_category_id",
            "name",
            "price",
            "status",
            "created_at",
            "updated_at",
        ];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize merchant_product object.
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
     * Serialize merchant_product object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.MERCHANT_PRODUCT, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
