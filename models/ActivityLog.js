"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  ACTIVITY_ACTION_TYPE,
} = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    entity_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    entity_name: {
      type: String,
      enum: Object.values(NAME),
      required: true,
    },
    old_doc: {
      type: Object,
    },
    new_doc: {
      type: Object,
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: NAME.USER,
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTION_TYPE),
      required: true,
    },
  },
  {
    collection: COLLECTION.ACTIVITY_LOG,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(log) {
    const {
      _id,
      entity_id,
      entity_name,
      old_doc,
      new_doc,
      updated_by,
      action,
      createdAt,
    } = log;
    return {
      id: _id,
      entity_id,
      entity_name,
      old_doc,
      new_doc,
      updated_by,
      action,
      timestamp: createdAt,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "entity_id",
      "entity_name",
      "old_doc",
      "new_doc",
      "updated_by",
      "action",
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

const MODEL = model(NAME.ACTIVITY_LOG, SCHEMA);

module.exports = MODEL;
