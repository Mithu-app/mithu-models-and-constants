"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION, TIMESTAMPS, MODEL: NAME, STORE_LOYALTY_TYPE } = require("../constants");

const SCHEMA = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        sub_title: {
            type: String,
            required: true,
        },
        background_image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.MERCHANT,
        },
        color_code: {
            type: String,
        },
        store_loyalty_type: {
            type: String,
            // enum: Object.values(STORE_LOYALTY_TYPE)
        },
        created_by: {
            type : Schema.Types.ObjectId,
            ref : NAME.USER
        },
        updated_by: {
            type : Schema.Types.ObjectId,
            ref : NAME.USER
        },
        deleted_at: {
            type: Date
        },
        deleted_by: {
            type : Schema.Types.ObjectId,
            ref : NAME.USER
        }
    },
    {
        collection: COLLECTION.STORE_LOYALTY,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(loyalty) {
        const { _id, title, sub_title, background_image, color_code, store_loyalty_type, description, name, merchant_id, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by } = loyalty;
        return {
            id: _id,
            title,
            sub_title,
            background_image,
            description,
            color_code,
            store_loyalty_type,
            name,
            merchant_id,
            created_at,
            created_by,
            updated_at,
            updated_by,
            deleted_at,
            deleted_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "title",
            "sub_title",
            "background_image",
            "store_loyalty_type",
            "color_code",
            "description",
            "name",
            "merchant_id",
            "created_at",
            "created_by",
            "updated_at",
            "updated_by",
            "deleted_at",
            "deleted_by",
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

const MODEL = model(NAME.STORE_LOYALTY, SCHEMA);

module.exports = MODEL;
