"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  USER_SESSION_STATUS,
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
      enum: Object.values(USER_SESSION_STATUS),
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
      status,
      last_active,
      platform,
      createdAt,
    } = log;
    return {
      id: _id,
      user,
      deviceId,
      ip,
      os,
      browser,
      status,
      last_active,
      platform,
      timestamp: createdAt,
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
      "status",
      "last_active",
      "platform",
      "createdAt",
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
