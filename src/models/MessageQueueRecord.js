"use strict";

const { object } = require("joi");
const { MODEL: NAME, COLLECTION, TIMESTAMPS, QUEUE_RECORD_STATUS } = require("../constants");
const { Schema, model, Types } = require("mongoose");

const SCHEMA = new Schema(
    {
        status: {
            type: String,
            default: QUEUE_RECORD_STATUS.VALID,
            enum: Object.values(QUEUE_RECORD_STATUS)
        },
        whatsapp_status :  {
            type: String,
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
        response: {
            type: Schema.Types.Mixed,
        },
        completed_at: Date
    },
    {
        collection: COLLECTION.MESSAGE_QUEUE_RECORD,
        timestamps: TIMESTAMPS,
    }
);


const MODEL = model(NAME.MESSAGE_QUEUE_RECORD, SCHEMA);

module.exports = MODEL;
