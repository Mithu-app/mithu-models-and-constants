"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  AFFILIATE_ORDER_PLATFORM_TYPE,
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
    store_id: { //subid1
      type: Schema.Types.ObjectId,
      ref: NAME.STORE,
      required: true,
    },
    customer_id: { //subid2
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    platform_type: {
      type: String,
      required: true,
      enum: Object.values(AFFILIATE_ORDER_PLATFORM_TYPE),
    },
    amount: { //order_sum
      type: Number,
    },
    discount_amount: {
      type: Number,
      default: 0,
    },
    platform_order_id: { //order_id
      type: String, 
    },
    program_id: { //offer_id
      type: String,
    },
    program_name:{ //offer_name
      type:String
    },
    currency:{ //currency
      type:String
    }
  },
  {
    collection: COLLECTION.AFFILIATE_MARKETING_ORDER,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("affiliate_order_placed", doc);
  next();
});

SCHEMA.statics = {
  serialize(order) {
    const {
      _id,
      order_number,
      merchant_id,
      discount_amount,
      customer_id,
      amount,
      platform_type,
      platform_order_id,
      program_name,
      program_id,
      currency,
      createdAt,
      updatedAt,
    } = order;
    return {
      id: _id,
      order_number,
      merchant_id,
      customer_id,
      platform_type,
      program_name,
      platform_order_id,
      amount,
      program_id,
      discount_amount,
      currency,
      createdAt,
      updatedAt,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "order_number",
      "merchant_id",
      "customer_id",
      "amount",
      "discount_amount",
      "platform_type",
      "program_name",
      "program_id",
      "platform_order_id",
      "currency",
      "createdAt",
      "updatedAt",
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

const MODEL = model(NAME.AFFILIATE_MARKETING_ORDER, SCHEMA);

module.exports = MODEL;
