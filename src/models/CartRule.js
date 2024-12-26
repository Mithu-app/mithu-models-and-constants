"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  CART_RULE_ACTION_TYPE,
  CART_RULE_TYPE,
  CART_RULE_SOURCE,
} = require("../constants");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
    },
    description: {
      type: String,
    },
    rule_type: {
      type: String,
      enum: Object.values(CART_RULE_TYPE),
      required: true,
    },
    is_published: {
      type: Boolean,
      default: true,
    },
    conditions: {
      order_count: {
        isEnable: {
          type: Boolean,
          required: true,
        },
        min_value: {
          type: Number,
        },
        max_value: {
          type: Number,
        },
      },
      order_amount: {
        isEnable: {
          type: Boolean,
          required: true,
        },
        min_value: {
          type: Number,
        },
        max_value: {
          type: Number,
        },
      },
      merchants: [
        {
          type: Schema.Types.ObjectId,
          ref: NAME.MERCHANT,
        },
      ],
      start_date: {
        type: Date,
        required: true,
      },
      end_date: {
        type: Date,
        required: true,
      },
    },
    rule_source: {
      type: String,
      enum: Object.values(CART_RULE_SOURCE),
      required: true,
    },
    action: {
      type: {
        type: String,
        enum: Object.values(CART_RULE_ACTION_TYPE),
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 0,
      },
      capping: {
        // max discount
        type: Number,
        required: true,
        min: 0,
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
    collection: COLLECTION.CART_RULE,
    timestamps: TIMESTAMPS,
  }
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
  /**
   * Serialize cartRule object.
   *
   * @memberOf MODEL
   * @param {Object} cartRule
   * @returns {Object}
   */
  serialize(cartRule) {
    const {
      _id,
      name,
      short_description,
      description,
      rule_type,
      rule_source,
      is_published,
      conditions,
      action,
      created_at,
      created_by,
      updated_at,
    } = cartRule;

    const serialized = {
      id: _id,
      name,
      short_description,
      description,
      rule_type,
      rule_source,
      is_published,
      conditions,
      action,
      created_at,
      created_by,
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
      "name",
      "short_description",
      "description",
      "rule_type",
      "rule_source",
      "is_published",
      "conditions",
      "action",
      "created_at",
      "created_by",
      "updated_at",
    ];
  },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
  /**
   * Serialize cartRule object.
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
   * Serialize cartRule object.
   *
   * @param {SCHEMA} doc
   * @returns {Object}
   */
  transform(doc) {
    return doc.serialize();
  },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.CART_RULE, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
