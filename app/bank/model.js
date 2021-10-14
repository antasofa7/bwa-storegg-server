const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama pemilik tidak boleh kosong!']
    },
    nameBank: {
        type: String,
        require: [true, 'Nama bank tidak boleh kosong!']
    },
    noRekening: {
        type: String,
        require: [true, 'No rekening bank tidak boleh kosong!']
    }
}, { timestamps: true})

module.exports = mongoose.model('Bank', bankSchema)