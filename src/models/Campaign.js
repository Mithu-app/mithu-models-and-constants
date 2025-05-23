"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    CAMPAIGN_STATUS,
    CAMPAIGN_TYPE,
    MOBILE_TYPE,
    REWARD_TYPE,
    TASK_TYPE,
} = require("../constants");

const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        // image: {
        //     type: String,
        //     required: true,
        // },
        country_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.COUNTRY,
            default: null,
        },
        type: {
            type: String,
            enum: Object.values(CAMPAIGN_TYPE),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(CAMPAIGN_STATUS),
            required: true,
        },
        task_type: {
            type: String,
            enum: Object.values(TASK_TYPE),
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        reward_type: {
            type: String,
            enum: Object.values(REWARD_TYPE), // e.g., "fixed", "random"
            required: true,
        },
        reward_value: {
            type: Number,
            required: true,
        },
        capping_per_user: {
            type: Number,
            default: 1, // how many times a user can claim
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER,
        },
        updated_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER,
        },
        deleted_at: {
            type: Date,
        },
        deleted_by: {
            type: Schema.Types.ObjectId,
            ref: NAME.USER,
        },
    },
    {
        collection: COLLECTION.CAMPAIGN,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(campaign) {
        const {
            _id,
            title,
            description,
            image,
            type,
            status,
            task_type,
            startDate,
            endDate,
            reward_type,
            reward_value,
            capping_per_user,
            country_id,
            created_by,
        } = campaign;

        return {
            id: _id,
            title,
            description,
            image,
            type,
            status,
            task_type,
            startDate,
            endDate,
            reward_type,
            reward_value,
            capping_per_user,
            country_id,
            created_by,
        };
    },

    getSelectableFields() {
        return [
            "id",
            "title",
            "description",
            "image",
            "type",
            "status",
            "task_type",
            "startDate",
            "endDate",
            "reward_type",
            "reward_value",
            "capping_per_user",
            "country_id",
            "created_by",
        ];
    },
};

SCHEMA.methods = {
    serialize() {
        return this.constructor.serialize(this);
    },
};

SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.CAMPAIGN, SCHEMA);

module.exports = MODEL;
