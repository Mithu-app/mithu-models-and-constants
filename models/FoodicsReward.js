"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true
        },
        reward_code : {
            type: String,
            required : true
        },
        reward_url: {
            type: String,
            required: true
        },
        redeem_url: {
            type: String,
            required: true
        },
        used_at: {
            type: Date
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        is_used: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: COLLECTION.FOODICS_REWARD,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(reward) {
        const { _id, reward_code, customer_id, reward_url,redeem_url, used_at, created_at, updated_at, is_used } = reward;
        return {
            id: _id,
            customer_id,
            reward_url,
            reward_code,
            redeem_url,
            used_at,
            created_at,
            updated_at,
            is_used,
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customer_id",
            "reward_url",
            "reward_code",
            "redeem_url",
            "used_at",
            "created_at",
            "updated_at",
            "is_used",
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

const MODEL = model(NAME.FOODICS_REWARD, SCHEMA);

module.exports = MODEL;
