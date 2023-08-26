const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    packageNumber: { type: String, required: true },
    packageLocation: { type: String, required: true },
    delivered: { type: Boolean, required: true },
    paid: { type: Boolean, required: true },
    
});

module.exports = mongoose.model('Delivery', deliverySchema);
