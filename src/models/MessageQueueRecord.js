"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, QUEUE_RECORD_STATUS } = require("../constants");
const { Schema, model, Types } = require("mongoose");

const SCHEMA = new Schema(
    {
        status: { 
            type: String,
            required: true,
            default: QUEUE_RECORD_STATUS.VALID,
            enum: Object.values(QUEUE_RECORD_STATUS)
        },
        per_day_sms_count: {
            type : Number,
            required : true
        },
        queue_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: NAME.MESSAGE_QUEUE,
        },
        phone_number: {
            type: String,
            required: true
        },
        parameters: [
            {
                value: String,
                order: Number,
                generic: Boolean,
            },
        ],
        completed_at : Date
    },
    {
        collection: COLLECTION.MESSAGE_QUEUE_RECORD,
        timestamps: TIMESTAMPS,
    }
);


const MODEL = model(NAME.MESSAGE_QUEUE_RECORD, SCHEMA);

module.exports = MODEL;
