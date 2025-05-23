"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, SLIDER_STATUS, SLIDER_TYPE, SLIDER_ENTITY_TYPES, MOBILE_TYPE } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        country_id: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: NAME.COUNTRY
        },
        image: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(SLIDER_TYPE)
        },
        entity_type: {
            type: String,
            default: null,
            enum: SLIDER_ENTITY_TYPES
        },
        status: {
            type: String,
            enum: Object.values(SLIDER_STATUS),
            required: true
        },
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        },
        mobile_type: {
            type: String,
            enum: Object.values(MOBILE_TYPE),
            default: MOBILE_TYPE.BOTH
        },
        action_url: {
            type: String,
            default: null
        },
        entity_id: {
            type: Schema.Types.ObjectId,
            refPath: 'entity_type', // Dynamic reference based on `entity_type`
            default: null
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
        collection: COLLECTION.SLIDER,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(slider) {
        const { _id, title, image, status, type,mobile_type, entity_type, entity_id, country_id, startDate, endDate, action_url, merchant, created_by } = slider;
        return {
            id: _id,
            title,
            image,
            type,
            entity_type,
            entity_id,
            status,
            mobile_type,
            startDate,
            country_id,
            endDate,
            action_url,
            merchant,
            created_by,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "title",
            "image",
            "type",
            "entity_type",
            "entity_id",
            "status",
            "mobile_type",
            "country_id",
            "startDate",
            "endDate",
            "action_url",
            "merchant.id",
            "merchant.name",
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

const MODEL = model(NAME.SLIDER, SCHEMA);

module.exports = MODEL;
