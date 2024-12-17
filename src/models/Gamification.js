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
    customerId: {
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
    const { _id, customerId, index, points, type, created_by } = slotMachine;
    return {
      id: _id,
      customerId,
      index,
      points,
      type,
      created_by,
    };
  },
  getSelectableFields() {
    return ["id", "customerId", "index", "points", "type", "created_by"];
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
