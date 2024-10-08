"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        brand_id: {
            type: Schema.ObjectId,
            ref: NAME.BRAND,
            required: true
        },
        merchant_id: {
            type: Schema.ObjectId,
            ref: NAME.MERCHANT,
            required: true
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
        collection: COLLECTION.MERCHANT_PROMOTION_TAG,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(merchantTags) {
        const { _id, title , image, brand_id, merchant_id, description, created_at, updated_at, created_by, updated_by, deleted_by } = merchantTags;
        return {
            id: _id,
            brand_id,
            merchant_id,
            title,
            image,
            description,
            created_at,
            updated_at,
            created_by,
            updated_by,
            deleted_by
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "brand_id",
            "merchant_id",
            "description",
            "title",
            "image",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
            "deleted_by"

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

const MODEL = model(NAME.MERCHANT_PROMOTION_TAG, SCHEMA);

module.exports = MODEL;
