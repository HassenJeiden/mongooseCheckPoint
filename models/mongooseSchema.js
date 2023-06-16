const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [],
    email: "string"
})


const persone = mongoose.model('personDetail', personSchema)
module.exports = persone