"use strict";

const { Schema, model } = require("mongoose");
const { COLLECTION, TIMESTAMPS, LANGUAGE_STATUS, MODEL: NAME } = require("@src/constants");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
        },
        isRTL: {
            type: Boolean,
            required: true
        },
        flag_image :{
            type : String,
        },
        locale: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(LANGUAGE_STATUS),
            default: LANGUAGE_STATUS.ACTIVE
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
        collection: COLLECTION.LANGUAGE,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.static({
    serialize(language) {
        const { _id, name, code, isRTL,flag_image, locale, status, created_by } = language;
        return {
            id: _id,
            name,
            code,
            isRTL,
            flag_image,
            locale,
            status,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
            "code",
            "flag_image",
            "isRTL",
            "locale",
            "status",
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

const MODEL = model(NAME.LANGUAGE, SCHEMA);

module.exports = MODEL;