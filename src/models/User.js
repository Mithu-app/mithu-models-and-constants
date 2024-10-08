"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS } = require("../constants");
const { Schema, model } = require("mongoose");

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
    password: {
      type: String,
      required: true,
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
    roles: [{
      type: Schema.Types.ObjectId,
      ref: NAME.ROLE,
      required: true,
    }],
    created_by: {
        type : Schema.Types.ObjectId,
        ref : NAME.USER
    },
    updated_by: {
        type : Schema.Types.ObjectId,
        ref : NAME.USER
    },
    deleted_at: {
        type: Date
    },
    deleted_by: {
        type : Schema.Types.ObjectId,
        ref : NAME.USER
    }
  },
  {
    collection: COLLECTION.USER,
    timestamps: TIMESTAMPS,
  },
);

SCHEMA.index({ "phone_number.code": 1, "phone_number.number": 1 }, { unique: true });

SCHEMA.statics = {
  serialize(user) {
    const { _id, name, email, password, phone_number, roles, created_by } = user;
    return {
      id: _id,
      name,
      email,
      phone_number,
      roles,
      password,
      created_by,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "name",
      "email",
      "phone_number",
      "roles",
      "password",
      "created_by",
    ];
  }
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


const MODEL = model(NAME.USER, SCHEMA);

module.exports = MODEL;
