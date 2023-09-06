const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String,  },
    lastName: { type: String,  },
    phoneNumber: { type: String, uniqe: true, required: true,  },
    verifyCode: { type: String, required: true },
    email: { type: String,  uniqe: true },
    address: { type: String,  },
    admin: { type: Boolean},
    finishRegister: { type: Boolean},
    myDeliveries: [{type: mongoose.Types.ObjectId, ref: "Delivery"}],
})

module.exports = mongoose.model('User', userSchema)