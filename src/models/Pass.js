"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, PASS_STATUS, SUBSCRIPTION_PERIOD } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        benefits: [
            {
                title: { type: String, required: true },
                sub_title: { type: String, required: true }
            }
        ],
        expiry_date: {
            type: Date,
        },
        subscription_period: {
            period_type: {
                type: String,
                required: true,
                enum: Object.values(SUBSCRIPTION_PERIOD)
            },
            duration: {
                type: Number,
                required: true,
                min: 1,
                validate: {
                    validator: Number.isInteger,
                    message: "Duration must be an integer."
                }
            }
        },
        amount: {
            type: Number,
            required: true

        },
        terms: {
            type: String,
            required: true
        },
        pass_image: {
            type: String, // Could use URL validation if needed
            required: true
        },
        merchants: [
            {
                type: Schema.Types.ObjectId,
                ref: NAME.MERCHANT
            }
        ],
        status: {
            type: String,
            enum: Object.values(PASS_STATUS),
            required: true,
            default: PASS_STATUS.ACTIVE
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
        collection: COLLECTION.PASS,
        timestamps: TIMESTAMPS,
    }
);
const MODEL = model(NAME.PASS, SCHEMA);

module.exports = MODEL;
