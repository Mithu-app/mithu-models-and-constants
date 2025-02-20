"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    program_id: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
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
    banner: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    is_published: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Object,
      required: true,
    },
    actions_detail: {
      type: Object,
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

// Static Methods
SCHEMA.statics = {
  serialize(store) {
    const {
      _id,
      program_id,
      name,
      logo,
      banner,
      url,
      is_published,
      actions,
      actions_detail,
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
      program_id,
      name,
      logo,
      banner,
      url,
      is_published,
      actions,
      actions_detail,
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

  // Returns the list of selectable fields for queries
  getSelectableFields() {
    return [
      "_id",
      "program_id",
      "name",
      "logo",
      "banner",
      "url",
      "is_published",
      "actions",
      "actions_detail",
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

// Instance Methods
SCHEMA.methods = {
  // Serialize the current document instance
  serialize() {
    return this.constructor.serialize(this);
  },
};

// JSON Transformation for output
SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

// Create and export the Store model
const MODEL = model(NAME.STORE, SCHEMA);

module.exports = MODEL;