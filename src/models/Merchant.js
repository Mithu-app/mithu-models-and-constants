"use strict";

const {
  MODEL: NAME,
  COLLECTION,
  TIMESTAMPS,
  MERCHANT_STATUS,
  MERCHANT_TYPE,
  ORDER_PLATFORM_TYPE,
} = require("../constants");
const { emitEvent } = require("../../socket");

const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.BRAND,
    },
    facilities: {
      type: [],
    },
    categories: {
      type: [],
    },
    short_description: {
      type: String,
    },
    qr_code: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    secret_key: {
      type: String,
      required: true,
    },
    is_most_loved: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: Object.values(MERCHANT_TYPE),
      default: MERCHANT_TYPE.DEFAULT,
    },
    description: {
      type: String,
    },
    delivery_time: {
      type: Number,
    },
    currency: {
      type: String,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CATEGORY,
    },
    merchant_type_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: NAME.MERCHANT_TYPE,
      },
    ],
    cuisine_type_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: NAME.CUISINE_TYPE,
      },
    ],
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
    platform: {
      type: String,
      enum: Object.values(ORDER_PLATFORM_TYPE),
    },
    password: {
      type: String,
      required: false,
      default: "",
    },
    minimum_redeem_points: {
      type: Number,
    },
    cashback_percent: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
    },
    cover_image: {
      type: String,
    },
    listing_image: {
      type: String,
    },
    website_url: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(MERCHANT_STATUS),
    },
    timeZone: {
      type: String,
      required: true,
    },
    operational_hours: {
      Monday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Tuesday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Wednesday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Thursday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Friday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Saturday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
      Sunday: {
        closing_time: String,
        isOff: {
          type: Boolean,
          default: false,
        },
        opening_time: String,
      },
    },
    delivery_options: {
      available: {
        type: Boolean,
        default: true,
      },
      deliveryRadius: Number,
      deliveryFee: Number,
      deliveryTime: Number,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: [],
      name: {
        type: String,
        required: true,
      },
    },
    contact_info: {
      phone: String,
      internal_phone: String,
      public_phone: String,
      email: String,
      website: String,
    },
    social_profiles: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    network_cashback_percentage: {
      type: Number,
    },
    tax_percentage: {
      type: Number,
      default : 0
    },
    network_reward_points: {
      type: Number,
    },
    reward_points: {
      type: Number,
      required: true,
    },
    commission_rate: {
      type: Number,
    },
    merchant_tag_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: NAME.MERCHANT_TAG,
      },
    ],
    country_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.COUNTRY,
    },
    state_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.STATE,
    },
    city_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.CITY,
    },
    area_id: {
      type: Schema.Types.ObjectId,
      ref: NAME.AREA,
    },
    is_published: {
      type: Boolean,
      default: true,
    },
    is_onboarded: {
      type: Boolean,
      default: true,
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
    default_language: {
      type: Schema.Types.ObjectId,
      ref: NAME.LANGUAGE,
      // default : //add function to make english as default
    },
  },
  {
    collection: COLLECTION.MERCHANT,
    timestamps: TIMESTAMPS,
  }
);

SCHEMA.post("save", (doc, next) => {
  emitEvent("merchant_added", doc);
  next();
});

SCHEMA.statics = {
  serialize(merchant) {
    const {
      _id,
      name,
      brand_id,
      address,
      qr_code,
      short_description,
      facilities,
      categories,
      platform,
      is_most_loved,
      description,
      delivery_time,
      currency,
      category_id,
      merchant_type_ids,
      cuisine_type_ids,
      unique_code,
      password,
      minimum_redeem_points,
      cashback_percent,
      network_cashback_percentage,
      tax_percentage,
      network_reward_points,
      reward_points,
      commission_rate,
      logo,
      cover_image,
      listing_image,
      website_url,
      merchant_tag_ids,
      location,
      contact_info,
      social_profiles,
      delivery_options,
      timeZone,
      operational_hours,
      country_id,
      state_id,
      city_id,
      area_id,
      is_published,
      secret_key,
      default_language,
      created_by,
      deleted_at,
      is_onboarded,
    } = merchant;
    return {
      id: _id,
      name,
      brand_id,
      address,
      qr_code,
      platform,
      short_description,
      facilities,
      categories,
      tax_percentage,
      is_most_loved,
      description,
      delivery_time,
      currency,
      category_id,
      merchant_type_ids,
      cuisine_type_ids,
      unique_code,
      password,
      minimum_redeem_points,
      cashback_percent,
      network_cashback_percentage,
      network_reward_points,
      reward_points,
      commission_rate,
      logo,
      cover_image,
      listing_image,
      website_url,
      country_id,
      state_id,
      city_id,
      area_id,
      is_published,
      merchant_tag_ids,
      location,
      contact_info,
      social_profiles,
      delivery_options,
      timeZone,
      operational_hours,
      secret_key,
      default_language,
      created_by,
      deleted_at,
      is_onboarded,
    };
  },
  getSelectableFields() {
    return [
      "_id",
      "name",
      "brand_id",
      "address",
      "qr_code",
      "platform",
      "short_description",
      "facilities",
      "categories",
      "is_most_loved",
      "description",
      "delivery_time",
      "currency",
      // "category_id",
      "merchant_type_ids",
      "cuisine_type_ids",
      "unique_code",
      "password",
      "minimum_redeem_points",
      "cashback_percent",
      "network_cashback_percentage",
      "tax_percentage",
      "network_reward_points",
      "reward_points",
      "commission_rate",
      "logo",
      "country_id",
      "state_id",
      "city_id",
      "area_id",
      "cover_image",
      "listing_image",
      "website_url",
      "merchant_tag_ids",
      "location",
      "delivery_options",
      "contact_info",
      "social_profiles",
      "timeZone",
      "operational_hours",
      "secret_key",
      "is_published",
      "default_language",
      "created_by",
      "deleted_at",
      "is_onboarded",
    ];
  },
};

SCHEMA.methods = {
  serialize() {
    return this.constructor.serialize(this);
  },
};

SCHEMA.set("toJSON", {
  transform(doc) {
    return doc.serialize();
  },
});

const MODEL = model(NAME.MERCHANT, SCHEMA);

module.exports = MODEL;
