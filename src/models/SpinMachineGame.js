"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    points: {
      type: Number,
      required: true,
    },
    probability_wheel_1: {
      type: Number,
      required: true,
    },
    probability_wheel_2: {
      type: Number,
      required: true,
    },
    probability_wheel_3: {
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
  serialize(spinMachine) {
    const {
      _id,
      points,
      probability_wheel_1,
      probability_wheel_2,
      probability_wheel_3,
      image,
      created_by,
    } = spinMachine;
    return {
      id: _id,
      points,
      probability_wheel_1,
      probability_wheel_2,
      probability_wheel_3,
      image,
      created_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "points",
      "probability_wheel_1",
      "probability_wheel_2",
      "probability_wheel_3",
      "image",
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

const MODEL = model(NAME.SLOT_MACHINE_GAME, SCHEMA);

module.exports = MODEL;