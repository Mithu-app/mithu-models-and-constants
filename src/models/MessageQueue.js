"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, QUEUE_STATUS, QUEUE_TYPE } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        status: { // complete-inProgress-stopped
            type: String,
            required: true,
            default: QUEUE_STATUS.IN_PROGRESS,
            enum: Object.values(QUEUE_STATUS)
        },
        type: {
            type: String,
            required: true,
            default: QUEUE_TYPE.WHATSAPP,
            enum: Object.values(QUEUE_TYPE)
        },
        total_records: {
            type: Number,
            default: 0,
        },
        valid_records: { // based on phone_numbers
            type: Number,
            default: 0,
        },
      
        template_id: {
            type: String,

        },
        text_to_send: {
            type: String
        },
        invalid_records: {
            type: Number,
            default: 0,
        },
        per_day_sms_count: {
            type : Number,
            required : true
        },
        records_sent: {
            type: Number,
            default: 0,
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
        collection: COLLECTION.MESSAGE_QUEUE,
        timestamps: TIMESTAMPS,
    }
);


const MODEL = model(NAME.MESSAGE_QUEUE, SCHEMA);

module.exports = MODEL;
