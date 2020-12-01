const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            default: 'n/a',
        },
        pages: {
            type: String,
            default: 'n/a',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        price: {
            type: String,
            default: 'n/a',
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamp: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
