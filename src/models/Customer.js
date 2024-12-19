"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  CUSTOMER_GENDER,
  CUSTOMER_STATUS,
  CURRENCY_KIND,
} = require("../constants");
const { string } = require("joi");
const { Schema, model } = require("mongoose");
const { emitEvent } = require("../../socket");

const SCHEMA = new Schema(
  {
    email: {
      type: String,
    },
    default_language: {
      type: Schema.Types.ObjectId,
      // default : //add function to make english as default
    },
    default_currency: {
      type: Schema.Types.ObjectId,
      // default : //add function to make SAR as default
    },
    currency_type: {
      type: String,
      enum: Object.values(CURRENCY_KIND),
      required: false,
    },
    referral_code: {
      type: String,
      unique: true,
    },
    referred_code: {
      type: String,
    },
    password: {
      type: String,
    },
    secret: {
      type: String,
      required: true,
    },
    twoFA_enabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
    date_of_birth: {
      date: {
        type: Number,
      },
      month: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
    gender: {
      type: String,
      enum: Object.values(CUSTOMER_GENDER),
    },
    country_code: {
      type: String,
    },
    email_verified_at: {
      type: Date,
    },
    phone_number: {
      code: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },
    phone_number_verified_at: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CUSTOMER_STATUS),
      default: CUSTOMER_STATUS.ACTIVE,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    terms_and_conditions_consent: {
      type: Boolean,
      default: false,
    },
    device_token: {
      type: String,
    },
    privacy_policy_consent: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
    },
    // New fields
    channel: {
      type: String,
      enum: ["android", "iphone", "desktop"],
    },
    customer_type: {
      type: Schema.Types.ObjectId,
      ref: NAME.CUSTOMER_TYPES, // Assuming there's a model named CustomerType
    },
    disable_nft: {
      type: Boolean,
      default: false,
    },
    disable_earning: {
      type: Boolean,
      default: false,
    },
    disable_redemption: {
      type: Boolean,
      default: false,
    },
    acquisition: {
      type: String,
      default: "mobile app",
    },
    is_earned_gaming_points: {
      type: Boolean,
      default: false,
    },
    signup_topup: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: COLLECTION.CUSTOMER,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("customer_registered", doc);
  next();
});

SCHEMA.static({
  serialize(customer) {
    const {
      _id,
      email,
      name,
      default_language,
      default_currency,
      acquisition,
      currency_type,
      disable_nft,
      disable_earning,
      disable_redemption,
      referral_code,
      referred_code,
      date_of_birth,
      gender,
      signup_topup,
      profile_pic,
      country,
      language,
      phone_number,
      email_verified_at,
      twoFA_enabled,
      phone_number_verified_at,
      terms_and_conditions_consent,
      privacy_policy_consent,
      device_token,
      created_at,
      updated_at,
      deleted_at,
      channel,
      customer_type,
      is_earned_gaming_points,
    } = customer;

    const serialized = {
      id: _id,
    };

    serialized.email = email;
    serialized.email_verified = email_verified_at != null;
    serialized.default_language = default_language;
    serialized.default_currency = default_currency;
    serialized.currency_type = currency_type;
    serialized.acquisition = acquisition;

    if (name != null) serialized.name = name;
    if (date_of_birth != null) serialized.date_of_birth = date_of_birth;
    if (gender != null) serialized.gender = gender;
    if (profile_pic != null) serialized.profile_pic = profile_pic;
    if (country != null) serialized.country = country;
    if (language != null) serialized.language = language;
    if (!privacy_policy_consent)
      serialized.privacy_policy_consent = privacy_policy_consent;
    if (!terms_and_conditions_consent)
      serialized.terms_and_conditions_consent = terms_and_conditions_consent;
    if (device_token != null) serialized.device_token = device_token;

    serialized.phone_number = phone_number;
    serialized.phone_number_verified = phone_number_verified_at != null;
    serialized.created_at = created_at;
    serialized.updated_at = updated_at;
    serialized.twoFA_enabled = twoFA_enabled;
    serialized.channel = channel;
    serialized.signup_topup = signup_topup;
    serialized.customer_type = customer_type;
    serialized.referral_code = referral_code;
    serialized.referred_code = referred_code;
    serialized.disable_nft = disable_nft;
    serialized.disable_earning = disable_earning;
    serialized.disable_redemption = disable_redemption;
    serialized.is_earned_gaming_points = is_earned_gaming_points;
    serialized.deleted_at = deleted_at;

    return serialized;
  },
  getSelectableFields() {
    return [
      "_id",
      "email",
      "name",
      "default_language",
      "default_currency",
      "currency_type",
      "signup_topup",
      "referral_code",
      "referred_code",
      "disable_nft",
      "disable_earning",
      "acquisition",
      "disable_redemption",
      "date_of_birth",
      "gender",
      "profile_pic",
      "device_token",
      "quantity",
      "country_code",
      "language",
      "email_verified_at",
      "twoFA_enabled",
      "phone_number",
      "phone_number_verified_at",
      "status",
      "created_at",
      "updated_at",
      "channel",
      "customer_type",
      "is_earned_gaming_points",
      "deleted_at",
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

const MODEL = model(NAME.CUSTOMER, SCHEMA);

module.exports = MODEL;
