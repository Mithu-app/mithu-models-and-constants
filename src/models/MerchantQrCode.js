"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.MERCHANT,
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
    collection: COLLECTION.MERCHANT_QR_CODE,
    timestamps: TIMESTAMPS,
  }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
  /**
   * Serialize brand object.
   *
   * @memberOf MODEL
   * @param {Object} brand
   * @returns {Object}
   */
  serialize(brand) {
    const {
      _id,
      label,
      path,
      merchant_id,
      created_at,
      created_by,
      updated_at,
      updated_by,
    } = brand;

    const serialized = {
      id: _id,
      label,
      path,
      merchant_id,
      created_at,
      created_by,
      updated_at,
      updated_by,
    };

    return serialized;
  },

  /**
   * Returns fields that can be selected by query parameters.
   *
   * @returns {string[]}
   */
  getSelectableFields() {
    return [
      "id",
      "label",
      "path",
      "merchant_id",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
    ];
  },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
  /**
   * Serialize brand object.
   *
   * @memberOf SCHEMA.prototype
   * @returns {Object}
   */
  serialize() {
    return MODEL.serialize(this);
  },
});

// ------------------------- Relations --------------------------

// ------------------------- Settings ---------------------------

SCHEMA.set("toJSON", {
  /**
   * Serialize brand object.
   *
   * @param {SCHEMA} doc
   * @returns {Object}
   */
  transform(doc) {
    return doc.serialize();
  },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.MERCHANT_QR_CODE, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
