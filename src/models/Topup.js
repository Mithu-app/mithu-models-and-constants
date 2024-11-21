"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");
const { emitEvent } = require("../../socket");

const SCHEMA = new Schema(
  {
    topup_number: {
      type: String,
      required: true,
      unique: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    reference_id: {
      type: Schema.Types.ObjectId,
    },
    reference_type: {
      type: String,
      enum: Object.values(COLLECTION),
    },
    amount: {
      type: Number,
    },
    discount_amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: NAME.CURRENCY,
      required: true,
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
    collection: COLLECTION.TOPUP,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("topup_placed", doc);
  next();
});

SCHEMA.statics = {
  serialize(topup) {
    const {
      _id,
      topup_number,
      customer_id,
      reference_id,
      reference_type,
      amount,
      discount_amount,
      currency,
      createdAt,
      updatedAt,
      created_by,
      deleted_at,
      deleted_by,
    } = topup;
    return {
      id: _id,
      topup_number,
      customer_id,
      reference_id,
      reference_type,
      amount,
      discount_amount,
      currency,
      createdAt,
      updatedAt,
      created_by,
      deleted_at,
      deleted_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "topup_number",
      "customer_id",
      "reference_id",
      "reference_type",
      "amount",
      "discount_amount",
      "currency",
      "createdAt",
      "updatedAt",
      "created_by",
      "deleted_at",
      "deleted_by",
    ];
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

const MODEL = model(NAME.TOPUP, SCHEMA);

module.exports = MODEL;
