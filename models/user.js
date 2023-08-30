const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, uniqe: true, required: true },
    password: { type: String, required: true, uniqe: true },
    email: { type: String, required: true, uniqe: true },
})

module.exports = mongoose.model('Users', userSchema)