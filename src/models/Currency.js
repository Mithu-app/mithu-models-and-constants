"use strict";

const {
    MODEL: NAME,
    COLLECTION,
    TIMESTAMPS,
    CURRENCY_KIND,
} = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CURRENCY_KIND),
      required: false,
      default: CURRENCY_KIND.FIAT,
    },
    point_rate: {
      type: Number,
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
    collection: COLLECTION.CURRENCY,
    timestamps: TIMESTAMPS,
  }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
  /**
   * Serialize currency object.
   *
   * @memberOf MODEL
   * @param {Object} currency
   * @returns {Object}
   */
  serialize(currency) {
    const {
      id,
      code,
      name,
      type,
      point_rate,
      created_at,
      created_by,
      updated_at,
    } = currency;

    const serialized = {
      id,
    };

    serialized.name = name;
    serialized.code = code;
    serialized.type = type;
    serialized.point_rate = point_rate;
    serialized.created_at = created_at;
    serialized.created_by = created_by;
    serialized.updated_at = updated_at;

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
      "code",
      "name",
      "type",
      "point_rate",
      "created_at",
      "created_by",
      "updated_at",
    ];
  },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize currency object.
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
     * Serialize currency object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.CURRENCY, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
