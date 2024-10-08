"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, CATEGORY_STATUS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        category_status: {
            type: String,
            enum: Object.values(CATEGORY_STATUS),
            default: CATEGORY_STATUS.ACTIVE
        },
        display_order: {
            type: Number,
            default: 0
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
        collection: COLLECTION.CATEGORY,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(category) {
        const { _id, name, image, category_status,display_order, created_by } = category;
        return {
            id: _id,
            name,
            image,
            display_order,
            category_status,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
            "image",
            "display_order",
            "category_status",
            "created_by",
        ];
    }
};

SCHEMA.methods = {
    serialize() {
        return this.constructor.serialize(this);
    }
};

SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.CATEGORY, SCHEMA);

module.exports = MODEL;