"use strict";

const { required } = require("joi");
const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: false,
      default: "",
    },
    image: {
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
    collection: COLLECTION.MERCHANT_TAGS,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(merchantTags) {
    const { _id, name, sub_title, image, display_order, created_by } =
      merchantTags;
    return {
      id: _id,
      name,
      sub_title,
      image,
      display_order,
      created_by,
    };
  },
  getSelectableFields() {
    return ["_id", "name", "sub_title", "image", "display_order", "created_by"];
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

const MODEL = model(NAME.MERCHANT_TAG, SCHEMA);

module.exports = MODEL;
