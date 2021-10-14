const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
    historyVoucherTopUp: {
        gameName: { type: String, require: [true, 'Nama game tidak boleh kosong.!'] },
        category: { type: String, require: [true, 'Kategori tidak boleh kosong!'] },
        thumbnail: { type: String },
        coinName: { type: String, require: [true, 'Nama koin tidak boleh kosong!'] },
        coinQuantity: { type: String, require: [true, 'Jumlah koin tidak boleh kosong!'] },
        price: { type: Number }
    },
    historyPayment: {
        name: { type: String, require: [true, 'Nama tidak boleh kosong!'] },
        type: { type: String, require: [true, 'Tipe tidak boleh kosong!'] },
        bankName: { type: String, require: [true, 'Nama bank tidak boleh kosong!'] },
        noRekening: { type: String, require: [true, 'Nomor rekening tidak boleh kosong!'] }
    },
    name: {
        type: String,
        require: [true, 'Nama tidak boleh kosong!'],
        maxLength: [225, 'Nama tidak boleh lebih dari 225 karakter!'],
        minLength: [3, 'Nama harus lebih dari 3 karakter!']
    },
    userAccount: {
        type: String,
        require: [true, 'Nama tidak boleh kosong!'],
        maxLength: [225, 'Nama user tidak boleh lebih dari 225 karakter!'],
        minLength: [3, 'Nama user harus lebih dari 3 karakter!']
    },
    tax: {
       type: Number,
       default: 0 
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser: {
        name: { type: String, require: [true, 'Nama player tidak boleh kosong!'] },
        phoneNumber: {
            type: Number,
            require: [true, 'Nama akun tidak boleh kosong!'],
            maxLength: [13, 'Nomor telepon tidak boleh lebih dari 13 karakter!'],
            minLength: [9, 'Nomor telepon harus lebih dari 9 karakter!']
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)