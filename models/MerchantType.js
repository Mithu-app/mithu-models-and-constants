"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    collection: COLLECTION.MERCHANT_TYPE,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(merchantType) {
    const { _id, name, display_order, created_by } = merchantType;
    return {
      id: _id,
      name,
      display_order,
      created_by,
    };
  },
  getSelectableFields() {
    return ["_id", "name", "display_order", "created_by"];
  },
});

SCHEMA.method({
  serialize() {
    return this.constructor.serialize(this);
  },
});

SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

const MODEL = model(NAME.MERCHANT_TYPE, SCHEMA);

module.exports = MODEL;
