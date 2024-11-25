"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  TRANSACTION_SOURCE_TYPE,
  TRANSACTION_STATUS,
} = require("../constants");
const { Schema, model } = require("mongoose");
const { emitEvent } = require("../../socket");

const SCHEMA = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER,
      required: true,
    },
    reference_id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: Object.values(TRANSACTION_STATUS),
    },
    reference_type: {
      type: String,
      enum: Object.values(COLLECTION),
    },
    entity_id: {
      type: Schema.Types.ObjectId,
    },
    entity_type: {
      type: String,
      enum: Object.values(COLLECTION),
    },
    transaction_type: {
      type: String,
      enum: Object.values(TRANSACTION_SOURCE_TYPE),
      required: true,
    },
    transaction_source_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.TRANSACTION_SOURCES,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
      // required: true,
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
    collection: COLLECTION.CUSTOMER_TRANSACTION,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("transaction_processed", doc);
  next();
});

SCHEMA.statics = {
  serialize(transaction) {
    const {
      _id,
      customer_id,
      transaction_type,
      status,
      transaction_source_id,
      points,
      merchant_id,
      entity_type,
      entity_id,
      timestamp,
      reference_id,
      reference_type,
      created_by,
      deleted_at,
      deleted_by,
    } = transaction;

    return {
      id: _id,
      customer_id,
      transaction_type,
      transaction_source_id,
      status,
      points,
      merchant_id,
      timestamp,
      entity_type,
      entity_id,
      reference_id,
      reference_type,
      created_by,
      deleted_at,
      deleted_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "customer_id",
      "transaction_type",
      "transaction_source_id",
      "points",
      "status",
      "merchant_id",
      "timestamp",
      "reference_id",
      "reference_type",
      "created_by",
      "deleted_at",
      "deleted_by",
    ];
  },
};

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

const MODEL = model(NAME.CUSTOMER_TRANSACTION, SCHEMA);

module.exports = MODEL;