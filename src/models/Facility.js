"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS  } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
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
        collection: COLLECTION.MERCHANT_FACILITY,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(faq) {
        const { _id, name, created_by } = faq;
        return {
            id: _id,
            name,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
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

const MODEL = model(NAME.MERCHANT_FACILITY, SCHEMA);

module.exports = MODEL;
