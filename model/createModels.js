const mongoose = require('mongoose')
module.exports = { createModels }

function createModels (type, schema, array) {
    return array.reduce((obj, k) => {
        obj[k] = mongoose.model(`${type}_${k}`, schema, `${type}_${k}`)
        return obj
    }, {})
}
