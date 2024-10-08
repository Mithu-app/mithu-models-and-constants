"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION, TIMESTAMPS, MODEL: NAME } = require("@src/constants");


const SCHEMA = new Schema(
    {
        lang_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.LANGUAGE,
            required: true
        },
        key: {
            type: String,
            required: true
        },
        value: {
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
        collection: COLLECTION.LOCALIZATION,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(localization) {
        const { _id, lang_id, key, value, created_by } = localization;
        return {
            id: _id,
            lang_id,
            key,
            value,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "lang_id",
            "key",
            "value",
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

const MODEL = model(NAME.LOCALIZATION, SCHEMA);

module.exports = MODEL