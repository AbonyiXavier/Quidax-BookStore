const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookCartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    items: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: "Book",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true,
        }
    }],
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Cart', BookCartSchema);