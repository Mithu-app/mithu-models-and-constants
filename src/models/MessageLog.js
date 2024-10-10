"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  HTTP_VERBS,
  LOG_TYPE,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(LOG_TYPE),
      required: true,
    },
    title: {
      type: String,
    },
    detail: {
      type: [Schema.Types.Mixed],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: NAME.USER,
    },
    url: {
      type: String,
    },
    url_type: {
      type: String,
      enum: Object.values(HTTP_VERBS),
    },
  },
  {
    collection: COLLECTION.MESSAGE_LOG,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(log) {
    const { _id, type, title, detail, user, url, url_type, createdAt } = log;
    return {
      id: _id,
      type,
      title,
      detail,
      user,
      url,
      url_type,
      timestamp: createdAt,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "type",
      "title",
      "detail",
      "user",
      "url",
      "url_type",
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

const MODEL = model(NAME.MESSAGE_LOG, SCHEMA);

module.exports = MODEL;
