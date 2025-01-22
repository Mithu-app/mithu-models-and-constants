"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  ORDER_PLATFORM_TYPE,
  ORDER_STATUS
} = require("../constants");
const { Schema, model } = require("mongoose");
const { emitEvent } = require("../../socket");

const SCHEMA = new Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
      required: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    platform_type: {
      type: String,
      required: true,
      enum: Object.values(ORDER_PLATFORM_TYPE),
    },
    amount: {
      type: Number,
    },
    discount_amount: {
      type: Number,
      default: 0,
    },
    commission_rate: {
      type: Number,
      required: true,
    },
    commission_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED
    },
    platform_id: {
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
    collection: COLLECTION.ORDER,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("order_placed", doc);
  next();
});

SCHEMA.statics = {
  serialize(order) {
    const {
      _id,
      order_number,
      merchant_id,
      status,
      discount_amount,
      customer_id,
      amount,
      commission_rate,
      commission_amount,
      platform_type,
      platform_id,
      createdAt,
      updatedAt,
      created_by,
      deleted_at,
      deleted_by,
    } = order;
    return {
      id: _id,
      order_number,
      merchant_id,
      status,
      customer_id,
      platform_type,
      platform_id,
      amount,      
      commission_rate,
      commission_amount,
      discount_amount,
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
      "order_number",
      "merchant_id",
      "customer_id",
      "status",
      "amount",
      "discount_amount",
      "platform_type",
      "platform_id",
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

const MODEL = model(NAME.ORDER, SCHEMA);

module.exports = MODEL;
