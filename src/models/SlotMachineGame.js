"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    points: {
      type: Number,
      required: true,
    },
    probability: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
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
    collection: COLLECTION.SLOT_MACHINE_GAME,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(slotMachine) {
    const { _id, points, probability, image, created_by } = slotMachine;
    return {
      id: _id,
      points,
      probability,
      image,
      created_by,
    };
  },
  getSelectableFields() {
    return ["_id", "points", "probability", "image", "created_by"];
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

const MODEL = model(NAME.SLOT_MACHINE_GAME, SCHEMA);

module.exports = MODEL;