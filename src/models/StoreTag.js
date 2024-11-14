"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  STORE_TAG_STATUS,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tag_status: {
      type: String,
      enum: Object.values(STORE_TAG_STATUS),
      default: STORE_TAG_STATUS.ACTIVE,
    },
    display_order: {
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
    collection: COLLECTION.STORE_TAG,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.statics = {
  serialize(category) {
    const { _id, name, tag_status, display_order, created_by } = category;
    return {
      id: _id,
      name,
      display_order,
      tag_status,
      created_by,
    };
  },
  getSelectableFields() {
    return ["_id", "name", "display_order", "tag_status", "created_by"];
  },
};

SCHEMA.methods = {
  serialize() {
    return this.constructor.serialize(this);
  },
};

SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

const MODEL = model(NAME.STORE_TAG, SCHEMA);

module.exports = MODEL;
