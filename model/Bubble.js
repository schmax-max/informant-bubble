'use strict'
const mongoose = require('mongoose');
const {createModels} = require('./createModels')

const schema = new mongoose.Schema( {
    _type: {
        type: "string"
    },
    _id: {
        type: "ObjectId"
    },
    created_at: {
        type: "date",
        format: "date-time"
    },
    name: {
        type: "string"
    },
    source_url: {
        type: "string"
    },
    source_domain: {
        type: "string"
    },
    mbfc_info: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });

const collections = [
    'others',
    'left',
    'left_center',
    'center',
    'right_center',
    'right',
    'pro_science',
    'fake_news',
    'conspiracy',
    'satire',
]

module.exports = createModels ('bubble', schema, collections)

