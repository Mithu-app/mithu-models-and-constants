"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  GAMIFICATION_TYPE,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(GAMIFICATION_TYPE),
    },
    unique_number: {
      type: String,
      required: true,
      unique: true,
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
    collection: COLLECTION.GAMIFICATION,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(slotMachine) {
    const {
      _id,
      customer_id,
      index,
      points,
      type,
      unique_number,
      reference_id,
      reference_type,
      amount,
      discount_amount,
      currency,
      created_by,
    } = slotMachine;
    return {
      id: _id,
      customer_id,
      index,
      points,
      type,
      unique_number,
      reference_id,
      reference_type,
      amount,
      discount_amount,
      currency,
      created_by,
    };
  },
  getSelectableFields() {
    return [
      "id",
      "customer_id",
      "index",
      "points",
      "type",
      "unique_number",
      "reference_id",
      "reference_type",
      "amount",
      "discount_amount",
      "currency",
      "created_by",
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

const MODEL = model(NAME.GAMIFICATION, SCHEMA);

module.exports = MODEL;
