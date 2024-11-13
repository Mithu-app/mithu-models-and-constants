"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  STORE_CATEGORY_STATUS,
} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    store_cashback_percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    app_cashback_percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rates: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          cashback_percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
          },
        },
      ],
      required: true,
    },
    category_status: {
      type: String,
      enum: Object.values(STORE_CATEGORY_STATUS),
      default: STORE_CATEGORY_STATUS.ACTIVE,
    },
    display_order: {
      type: Number,
      default: 0,
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
    collection: COLLECTION.STORE,
    timestamps: TIMESTAMPS,
  }
);

// Static methods
SCHEMA.statics = {
  serialize(category) {
    const {
      _id,
      name,
      logo,
      url,
      store_cashback_percentage,
      app_cashback_percentage,
      rates,
      category_status,
      display_order,
      created_by,
    } = category;
    return {
      id: _id,
      name,
      logo,
      url,
      store_cashback_percentage,
      app_cashback_percentage,
      rates,
      display_order,
      category_status,
      created_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "name",
      "logo",
      "url",
      "store_cashback_percentage",
      "app_cashback_percentage",
      "rates",
      "display_order",
      "category_status",
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

// JSON transformation
SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

const MODEL = model(NAME.STORE, SCHEMA);

module.exports = MODEL;
