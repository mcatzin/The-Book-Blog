/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
const express = require('express');

const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
// Models
const { Book } = require('../models/book');
const { auth } = require('../middleware/auth');

// API routes
router
    .route('/book')
    .get(
        expressAsyncHandler(async (req, res) => {
            let id = req.query.id;
            console.log('id', id);
            const book = await Book.find({ _id: id }).populate('ownerId', 'name lastname');

            if (book) {
                res.send(...book);
            } else {
                return res.status(400).send({ message: 'Book not found' });
            }
        })
    )
    .post(
        auth,
        expressAsyncHandler(async (req, res) => {
            const book = new Book({
                ...req.body,
                ownerId: req.user._id,
            });
            const bookCreated = await book.save();
            if (bookCreated) {
                res.status(200).send({ message: 'Product created', post: true, bookId: bookCreated._id });
            } else {
                res.status(400).send({ message: 'Error in creating book' });
            }
        })
    )
    .patch(
        auth,
        expressAsyncHandler(async (req, res) => {
            const book = await Book.findByIdAndUpdate(req.body._id, req.body, { new: true });
            if (book) {
                res.status(200).send({ success: true, book });
            } else {
                res.status(400).send({ message: 'Error in updating book' });
            }
        })
    )
    .delete(
        auth,
        expressAsyncHandler(async (req, res) => {
            const { id } = req.query;
            const deletedBook = await Book.findByIdAndRemove(id);
            if (deletedBook) {
                res.status(200).send({ message: 'Book deleted' });
            } else {
                res.status(400).send({ message: 'Error in deleting book' });
            }
        })
    );

router.route('/all_books').get(
    expressAsyncHandler(async (req, res) => {
        // limit 2 and asc
        // localhost:/api/books/all_books?ship=1&limit=2&order=asc&owner=jcia
        const skip = req.query.skip ? parseInt(req.query.skip) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const order = req.query.order ? req.query.order : 'asc';
        const byOwner = req.query.owner ? { ownerId: req.query.owner } : {};

        const books = await Book.find(byOwner).skip(skip).sort({ _id: order }).limit(limit);
        if (books) {
            res.send(books);
        } else {
            return res.status(400).send({ message: 'Books not found' });
        }
    })
);

module.exports = router;
