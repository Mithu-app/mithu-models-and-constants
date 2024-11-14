"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
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
    categories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: NAME.STORE_CATEGORY,
        },
      ],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "The 'categories' array must not be empty.",
      },
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: NAME.STORE_TAG,
        },
      ],
      required: true,
    },
    exclusion: {
      type: String,
      required: true,
    },
    special_terms: {
      type: String,
      required: true,
    },
    deals_and_coupons: {
      type: String,
      required: true,
    },
    save_time: {
      type: Number,
      required: true,
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
  serialize(store) {
    const {
      _id,
      name,
      logo,
      url,
      store_cashback_percentage,
      app_cashback_percentage,
      rates,
      categories,
      tags,
      exclusion,
      special_terms,
      deals_and_coupons,
      save_time,
      display_order,
      created_by,
      deleted_at,
      deleted_by,
    } = store;
    return {
      id: _id,
      name,
      logo,
      url,
      store_cashback_percentage,
      app_cashback_percentage,
      rates,
      categories,
      tags,
      exclusion,
      special_terms,
      deals_and_coupons,
      save_time,
      display_order,
      created_by,
      deleted_at,
      deleted_by,
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
      "categories",
      "tags",
      "exclusion",
      "special_terms",
      "deals_and_coupons",
      "save_time",
      "display_order",
      "created_by",
      "deleted_at",
      "deleted_by",
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
