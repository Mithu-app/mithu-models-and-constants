"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, MINTING_STATUS } = require("@src/constants");
const { Schema, model } = require("mongoose");

const SCHEMA = new Schema(
    {
        name: {
            type: String,
        },
        card_number: {
            type: String,

            unique: true
        },
        symbol: {
            type: String,
        },
        token_uri: {
            type: String,
        },
        contract_address: {
            type: String,
        },
        owner_address: {
            type: String,
        },
        tx_ids: {
            type: [String],
        },
        fee: {
            type: String,
        },
        minted_address: {
            type: String,
        },
        nft_id: {
            type: String,
        },
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.CUSTOMER,
        },
        merchant_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.MERCHANT,
        },
        storeLoyalty_id: {
            type: Schema.Types.ObjectId,
            ref: NAME.STORE_LOYALTY,
        },
        status: {
            type: String,
            enum: Object.values(MINTING_STATUS),
            default: MINTING_STATUS.PENDING
        },
        scheduled_time: {
            type: Date
        }
    },
    {
        collection: COLLECTION.MEMBERSHIP_CLAIM,
        timestamps: TIMESTAMPS,
    }
);

SCHEMA.statics = {
    serialize(membership_claim) {
        const {
            _id, nft_id, name, symbol, token_uri, contract_address, owner_address,
            tx_ids, fee, minted_address, created_at, updated_at,
            customer_id, merchant_id, storeLoyalty_id, card_number, status, scheduled_time
        } = membership_claim;
        return {
            id: _id,
            name,
            nft_id,
            symbol,
            card_number,
            token_uri,
            contract_address,
            owner_address,
            tx_ids,
            fee,
            minted_address,
            created_at,
            updated_at,
            customer_id,
            merchant_id,
            storeLoyalty_id,
            status,
            scheduled_time
        };
    },
    getSelectableFields() {
        return [
            "_id",
            "name",
            "symbol",
            "nft_id",
            "card_number",
            "token_uri",
            "contract_address",
            "owner_address",
            "tx_ids",
            "fee",
            "minted_address",
            "created_at",
            "updated_at",
            "customer_id",
            "merchant_id",
            "storeLoyalty_id",
            "status",
            "scheduled_time"
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

const MODEL = model(NAME.MEMBERSHIP_CLAIM, SCHEMA);

module.exports = MODEL;