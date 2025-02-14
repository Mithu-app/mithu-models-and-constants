"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, MANUAL_TOPUP_TYPE } = require("../constants");
const { Schema, model } = require("mongoose");
const { emitEvent } = require("../../socket");

const SCHEMA = new Schema(
  {
    topup_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: NAME.TOPUP,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    points: {
      type: Number,
    },
    comment: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(MANUAL_TOPUP_TYPE),
      default: MANUAL_TOPUP_TYPE.NETWORK
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: NAME.MERCHANT,
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
    collection: COLLECTION.MANUAL_TOPUP,
    timestamps: TIMESTAMPS,
  }
);
const MODEL = model(NAME.MANUAL_TOPUP, SCHEMA);

module.exports = MODEL;
