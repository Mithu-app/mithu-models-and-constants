"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  LOG_TYPE,
  LOG_PLATFORM,
  OTP_SENDER_PLATFORM,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(LOG_TYPE),
      required: true,
    },
    sender: {
      type: String,
      enum: Object.values(OTP_SENDER_PLATFORM),
      required: true,
    },
    detail: {
      type: Schema.Types.Mixed,
    },
    platform: {
      type: String,
      enum: Object.values(LOG_PLATFORM),
      required: true,
    },
  },
  {
    collection: COLLECTION.SMS_LOG,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(log) {
    const { _id, type, sender, detail, platform, created_at, updated_at } = log;
    return {
      id: _id,
      type,
      sender,
      detail,
      platform,
      created_at,
      updated_at,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "type",
      "sender",
      "detail",
      "platform",
      "created_at",
      "updated_at",
    ];
  },
};

// Instance methods
SCHEMA.methods = {
  serialize() {
    return this.constructor.serialize(this);
  },
};

// Customize JSON output
SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

const MODEL = model(NAME.SMS_LOG, SCHEMA);

module.exports = MODEL;
