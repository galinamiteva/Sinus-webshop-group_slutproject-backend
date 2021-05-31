const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: String,
    name: String,
    role: {
        type: String,
        default: 'customer'
    },
    adress: {
        street: String,
        zip: Number,
        city: String
    },
    orderHistory: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]

})

const User = mongoose.model('User', userSchema);


module.exports = User;