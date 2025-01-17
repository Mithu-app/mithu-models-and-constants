"use strict";

const { Schema, model } = require("mongoose");
const {
  COLLECTION,
  TIMESTAMPS,
  MODEL: NAME,
  MANUAL_RECEIPT_STATUS,
  MANUAL_RECEIPT_TYPE,
} = require("../constants");

const SCHEMA = new Schema(
  {
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MANUAL_RECEIPT_STATUS),
      default: MANUAL_RECEIPT_STATUS.PENDING,
      required: true,
    },
    order_amount: {
      type: Number,
      default : 0
    },
    reason: {
      type: String,
    },
    discount_amount: {
      default: 0,
      type: Number,
    },
    unique_number: {
      type: String,
      unique: true,
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
    collection: COLLECTION.MANUAL_RECEIPT,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(manualReceipt) {
    const {
      _id,
      merchant_id,
      image,
      date,
      customer_id,
      status,
      order_amount,
      discount_amount,
      unique_number,
      reason,
      created_by,
      created_at,
      updated_at,
    } = manualReceipt;
    return {
      id: _id,
      merchant_id,
      image,
      date,
      customer_id,
      status,
      order_amount,
      discount_amount,
      unique_number,
      reason,
      created_by,
      created_at,
      updated_at,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "merchant_id",
      "image",
      "date",
      "customer_id",
      "status",
      "order_amount",
      "discount_amount",
      "unique_number",
      "reason",
      "created_by",
      "created_at",
      "updated_at",
    ];
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

const MODEL = model(NAME.MANUAL_RECEIPT, SCHEMA);

module.exports = MODEL;
