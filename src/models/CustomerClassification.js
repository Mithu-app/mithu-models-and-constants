"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
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
        collection: COLLECTION.CUSTOMER_CLASSIFICATION,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(customerClassification) {
        const { _id, name , points ,image, created_by } = customerClassification;
        return {
            id: _id,
            name,
            points,
            image,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
            "points",
            "image",
            "created_by",
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

const MODEL = model(NAME.CUSTOMER_CLASSIFICATION, SCHEMA);

module.exports = MODEL;
