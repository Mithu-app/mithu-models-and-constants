"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
    },
    password: {
      type: String,
      required: false,
      default: "",
    },
    phone_number: {
      code: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true
      }
    },
    unique_code: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return v.length == 6;
        },
        message: (props) =>
          `${props.value} is not a valid unique code. It must be exactly 6 characters long.`,
      },
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
    collection: COLLECTION.BRAND,
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
    const { _id, name, email, domain, password, phone_number, unique_code, created_at, created_by, updated_at, updated_by } = brand;

    const serialized = {
      id: _id,
      name,
      email,
      domain,
      password,
      phone_number,
      unique_code,
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
    return ["id", "name", "domain", "email", "password", "phone_number", "unique_code", "created_at", "created_by", "updated_at", "updated_by"];
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

const MODEL = model(NAME.BRAND, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
