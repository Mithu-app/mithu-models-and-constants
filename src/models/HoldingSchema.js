"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS , HOLDING_SCHEMA_STATUS, HOLDING_SCHEMA_TYPE} = require("../constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        customer_id: {
            type: Schema.ObjectId,
            ref  : NAME.CUSTOMER,
            required: true
        },
        order_id: {
            type: String
        },
        amount: {
            type: Number,
            default : 0
        },
        reward_code: {
            type: String,
            default: 0
        },
        status : {
            type : String,
            enum : Object.values(HOLDING_SCHEMA_STATUS),
            // default : HOLDING_SCHEMA_STATUS.PENDING
        },
        type : {
            type : String,
            enum : Object.values(HOLDING_SCHEMA_TYPE),
        }
    },
    {
        collection: COLLECTION.HOLDING_SCHEMA,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(holding_schema) {
        const { _id, customer_id, order_id, amount,reward_code,status ,type} = holding_schema;
        return {
            id: _id,
            customer_id,
            order_id,
            reward_code,
            amount,
            status,
            type
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "customer_id",
            "order_id",
            "reward_code",
            "amount",
            "status",
            "type"
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

const MODEL = model(NAME.HOLDING_SCHEMA, SCHEMA);

module.exports = MODEL;
