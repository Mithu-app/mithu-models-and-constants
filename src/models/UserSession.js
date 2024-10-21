"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  USER_SESSION_STATUS,
  LOG_PLATFORM,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    device: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(USER_SESSION_STATUS),
      required: true,
    },
    last_active: {
      type: Date,
    },
    platform: {
      type: String,
      enum: Object.values(LOG_PLATFORM),
      required: true,
    },
  },
  {
    collection: COLLECTION.USER_SESSION,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(log) {
    const {
      _id,
      user,
      deviceId,
      ip,
      os,
      browser,
      device,
      status,
      last_active,
      platform,
      created_at,
      updated_at,
    } = log;
    return {
      id: _id,
      user,
      deviceId,
      ip,
      os,
      browser,
      device,
      status,
      last_active,
      platform,
      created_at,
      updated_at,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "user",
      "deviceId",
      "ip",
      "os",
      "browser",
      "device",
      "status",
      "last_active",
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

const MODEL = model(NAME.USER_SESSION, SCHEMA);

module.exports = MODEL;
