"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, RATING_STATUS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      // ref: COLLECTION.PRODUCT, //uncomment this after making product scehma
      required: false,
      default: null,
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
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(RATING_STATUS),
      required: true,
      default: RATING_STATUS.PENDING,
    },
    is_recommended_by_me: {
      type: Boolean,
    },
    most_impressed_feature: [
      {
        type: String,
      },
    ],
    is_published: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    collection: COLLECTION.RATING,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.statics = {
  serialize(rating) {
    const {
      _id,
      product_id,
      merchant_id,
      customer_id,
      is_recommended_by_me,
      most_impressed_feature,
      is_published,
      ratings,
      message,
      picture,
      status,
      created_at,
      updated_at,
    } = rating;
    return {
      id: _id,
      product_id,
      merchant_id,
      customer_id,
      ratings,
      is_recommended_by_me,
      most_impressed_feature,
      is_published,
      message,
      picture,
      status,
      created_at,
      updated_at,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "product_id",
      "merchant_id",
      "customer_id",
      "is_recommended_by_me",
      "most_impressed_feature",
      "is_published",
      "ratings",
      "message",
      "picture",
      "status",
      "created_at",
      "updated_at",
    ];
  },
};

SCHEMA.methods = {
    serialize() {
        return this.constructor.serialize(this);
    }
};

SCHEMA.set("toJSON", {
    transform(doc) {
        return doc.serialize();
    },
});

const MODEL = model(NAME.RATING, SCHEMA);

module.exports = MODEL;
