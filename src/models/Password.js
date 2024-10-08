const { MODEL: NAME, COLLECTION, TIMESTAMPS, } = require("../constants");
const { Schema, model, Types } = require("mongoose");


const SCHEMA = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: NAME.USER,
            required: true,
            unique: true,
        },
        pass_code: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        deleted_at: {
            type: Date,
        },
    },
    {
        collection: COLLECTION.PASSWORD,
    });


// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize resetPassword object.
     *
     * @memberOf MODEL
     * @param {Object} password
     * @returns {Object}
     */
    serialize(password) {
      const {
        id,
        customer,
        pass_code,
        created_at,
      } = password;
  
      return {
        id,
        customer,
        pass_code,
        created_at,
      };
    },
  
    /**
     * Returns fields that can be selected by query parameters.
     *
     * @returns {string[]}
     */
    getSelectableFields() {
      return [
        "id",
        "customer",
        "pass_code",
        "created_at",
      ];
    },
  });
  
  // ------------------------- Methods ----------------------------
  
  SCHEMA.method({
    /**
     * Serialize order object.
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
     * Serialize order object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
      return doc.serialize();
    },
  });
  
  // ------------------------- Model ------------------------------
  
  const MODEL = model(NAME.PASSWORD, SCHEMA);
  
  // ------------------------- Exports ----------------------------
  
  module.exports = MODEL;
  