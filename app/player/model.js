const mongoose = require('mongoose')

let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email tidak boleh kosong!']
    },
    name: {
        type: String,
        require: [true, 'Nama tidak boleh kosong!'],
        maxLength: [225, 'Nama user tidak boleh lebih dari 225 karakter!'],
        minLength: [3, 'Nama user harus lebih dari 3 karakter!']
    },
    userName: {
        type: String,
        require: [true, 'Username tidak boleh kosong!'],
        maxLength: [225, 'Password tidak boleh lebih dari 225 karakter!'],
        minLength: [6, 'Password harus lebih dari 6 karakter!']
    },
    password: {
        type: String,
        require: [true, 'Password tidak boleh kosong'],
        maxLength: [225, 'Username tidak boleh lebih dari 225 karakter!'],
        minLength: [6, 'Username harus lebih dari 6 karakter!']
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: { type: String },
    fileName: { type: String },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepon tidak boleh kosong!'],
        maxLength: [13, 'Nomor telepon tidak boleh lebih dari 13 karakter!'],
        minLength: [9, 'Nomor telepon harus lebih dari 9 karakter!']
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true})

module.exports = mongoose.model('Player', playerSchema)