"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
      required: true,
    },
    swipe_text: {
      type: String,
    },
    vibe_category: {
      type: Schema.Types.ObjectId,
      ref: NAME.VIBE_CATEGORY,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: NAME.USER,
    },
    seen_by: [
      {
        type: Schema.Types.ObjectId,
        ref: NAME.CUSTOMER, // Assuming a Customer model exists
      },
    ],
    liked_by: [
      {
        type: Schema.Types.ObjectId,
        ref: NAME.CUSTOMER, // Assuming a Customer model exists
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    isVideo: {
      type: Boolean,
    },
    expiry: {
      type: Date,
    },
    hashTags: [
      {
        type: String,
      },
    ],
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
    collection: COLLECTION.MERCHANT_VIBE,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.static({
  serialize(merchantType) {
    const {
      _id,
      merchant_id,
      image,
      thumbnail,
      isVideo,
      expiry,
      swipe_text,
      vibe_category,
      seen_by,
      likes,
      liked_by,
      hashTags,
      created_by,
      created_at,
    } = merchantType;
    return {
      id: _id,
      merchant_id,
      swipe_text,
      vibe_category,
      seen_by,
      likes,
      liked_by,
      image,
      thumbnail,
      isVideo,
      expiry,
      hashTags,
      created_by,
      created_at,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "merchant_id",
      "image",
      "thumbnail",
      "isVideo",
      "expiry",
      "swipe_text",
      "vibe_category",
      "likes",
      "liked_by,",
      "created_by",
      "seen_by",
      "hashTags",
      "created_at",
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

const MODEL = model(NAME.MERCHANT_VIBE, SCHEMA);

module.exports = MODEL;
