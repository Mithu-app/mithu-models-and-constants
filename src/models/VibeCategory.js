"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    VIBE_CATEGORY_SOURCE,
} = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category_source: {
            type: String,
            enum: Object.values(VIBE_CATEGORY_SOURCE),
            required: true,
        },
        is_published: {
            type: Boolean,
            default: true,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER
        },
        updated_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER
        },
        deleted_at: {
            type: Date
        },
        deleted_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER
        }
    },
    {
        collection: COLLECTION.VIBE_CATEGORY,
        timestamps: TIMESTAMPS,
    }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize cartRule object.
     *
     * @memberOf MODEL
     * @param {Object} cartRule
     * @returns {Object}
     */
    serialize(cartRule) {
        const { _id, name, category_source, is_published, created_at, created_by, updated_at } = cartRule;

        const serialized = {
            id: _id,
            name,
            category_source,
            is_published,
            created_at,
            created_by,
            updated_at,
        };

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
            "name",
            "category_source",
            "is_published",
            "created_at",
            "created_by",
            "updated_at",
        ];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize cartRule object.
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
     * Serialize cartRule object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.VIBE_CATEGORY, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
