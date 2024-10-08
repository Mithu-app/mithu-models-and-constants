"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS,ORDER_PLATFORM_TYPE } = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        order_number: {
            type: String,
            required: true,
            unique: true,
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.MERCHANT,
            required: true
        },
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
            required: true
        },
        platform_type : {
            type: String,
            required: true,
            enum : Object.values(ORDER_PLATFORM_TYPE)
        },
        amount: {
            type: Number,
        },
        
        discount_amount: {
            type: Number,
            default : 0
        },
        
        platform_id : {
            type : String

        }
    },
    {
        collection: COLLECTION.ORDER,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(order) {
        const { _id, order_number, merchant_id,discount_amount, customer_id, amount, platform_type, platform_id,createdAt, updatedAt } = order;
        return {
            id: _id,
            order_number,
            merchant_id,
            customer_id,
            platform_type,
            platform_id,
            amount,
            discount_amount,
            createdAt,
            updatedAt
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "order_number",
            "merchant_id",
            "customer_id",
            "amount",
            "discount_amount",
            "platform_type",
            "platform_id",
            "createdAt",
            "updatedAt"
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

const MODEL = model(NAME.ORDER, SCHEMA);

module.exports = MODEL;
