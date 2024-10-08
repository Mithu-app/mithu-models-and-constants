"use strict";

const { MODEL: NAME, COLLECTION, TIMESTAMPS, ROLE_NAMES, PERSMISSIONS_TYPES, PERMISSION_ACTION_TYPES } = require("@src/constants");
const { string } = require("joi");
const { Schema, model } = require("mongoose");

// ------------------------- Schema -----------------------------

const SCHEMA = new Schema(
    {
        name: {
            type: String,
            enum: Object.values(ROLE_NAMES)
        },
        permissions: [{
            role_type: {
                type: String,
                enum: Object.values(PERSMISSIONS_TYPES)
            },
            action: {
                type: String,
                enum: Object.values(PERMISSION_ACTION_TYPES)
            },
        }],
        updated_by: {
            type : Schema.Types.ObjectId,
            ref : NAME.USER
        },
    },
    {
        collection: COLLECTION.ROLE,
        timestamps: TIMESTAMPS,
    },
);

// ------------------------- Statics ----------------------------

SCHEMA.static({
    /**
     * Serialize role object.
     *
     * @memberOf MODEL
     * @param {Object} role
     * @returns {Object}
     */
    serialize(role) {
        const { id, permissions, name, created_at, updated_at, updated_by } = role;

        const serialized = {
            id,
            permissions,
            name,
            created_at,
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
        return ["id", "name", "permissions", "created_at", "updated_at", "updated_by"];
    },
});

// ------------------------- Methods ----------------------------

SCHEMA.method({
    /**
     * Serialize role object.
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
     * Serialize role object.
     *
     * @param {SCHEMA} doc
     * @returns {Object}
     */
    transform(doc) {
        return doc.serialize();
    },
});

// ------------------------- Model ------------------------------

const MODEL = model(NAME.ROLE, SCHEMA);

// ------------------------- Exports ----------------------------

module.exports = MODEL;
