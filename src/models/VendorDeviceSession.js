"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  VENDOR_DEVICE_SESSION_STATUS,
} = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
  {
    device_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.DEVICE,
    },
    status: {
      type: String,
      enum: Object.values(VENDOR_DEVICE_SESSION_STATUS),
      default: VENDOR_DEVICE_SESSION_STATUS.ACTIVE,
    },
    is_email_sent: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    collection: COLLECTION.VENDOR_DEVICE_SESSION,
    timestamps: TIMESTAMPS,
  }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
  /**
   * Serialize vendor_device_session object.
   *
   * @memberOf MODEL
   * @param {Object} vendor_device_session
   * @returns {Object}
   */
  serialize(vendor_device_session) {
    const { id, device_id, status, is_email_sent, created_at, updated_at } =
      vendor_device_session;

    const serialized = {
      id,
      device_id,
      status,
      is_email_sent,
      created_at,
      updated_at,
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
      "device_id",
      "status",
      "is_email_sent",
      "created_at",
      "updated_at",
    ];
  },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
  /**
   * Serialize vendor_device_session object.
   *
   * @memberOf SCHEMA.prototype
   * @returns {Object}
   */
  serialize() {
    return MODEL.serialize(this);
  },
});

// ------------------------- Settings ---------------------------

SCHEMA.set("toJSON", {
  /**
   * Serialize vendor_device_session object.
   *
   * @param {SCHEMA} doc
   * @returns {Object}
   */
  transform(doc) {
    return doc.serialize();
  },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.VENDOR_DEVICE_SESSION, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
