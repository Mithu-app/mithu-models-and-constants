"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION, TIMESTAMPS, MODEL: NAME } = require("../constants");


const SCHEMA = new Schema(
    {
        eid: {
            type: String,
            required: true
        },
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
        updated_by: {
            type : Schema.Types.ObjectId,
            ref : NAME.USER
        },
    },
    {
        collection: COLLECTION.SYSTEM_LOCALIZATION,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(system_localization) {
        const { _id,eid, lang_id, key, value, updated_by } = system_localization;
        return {
            id: _id,
            eid,
            lang_id,
            key,
            value,
            updated_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "eid",
            "lang_id",
            "key",
            "value",
            "updated_by",
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

const MODEL = model(NAME.SYSTEM_LOCALIZATION, SCHEMA);

module.exports = MODEL