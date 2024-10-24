"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.BRAND,
      required: true,
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    device_id: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    enable: {
      type: Boolean,
      required: true,
    },
    device_token: {
      type: String,
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
    collection: COLLECTION.DEVICE,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(log) {
    const {
      _id,
      brand_id,
      merchant_id,
      name,
      device_id,
      pin,
      enable,
      device_token,
      created_at,
      updated_at,
      created_by,
    } = log;
    return {
      id: _id,
      brand_id,
      merchant_id,
      name,
      device_id,
      pin,
      enable,
      device_token,
      created_at,
      updated_at,
      created_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "brand_id",
      "merchant_id",
      "name",
      "device_id",
      "pin",
      "enable",
      "device_token",
      "created_at",
      "updated_at",
      "created_by",
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

const MODEL = model(NAME.DEVICE, SCHEMA);

module.exports = MODEL;
