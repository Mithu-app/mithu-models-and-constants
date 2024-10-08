"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        deleted_at : {
            type : Date
        }
    },
    {
        collection: COLLECTION.CUISINE_TYPE,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(cuisineType) {
        const { _id, name } = cuisineType;
        return {
            id: _id,
            name,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
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

const MODEL = model(NAME.CUISINE_TYPE, SCHEMA);

module.exports = MODEL;
