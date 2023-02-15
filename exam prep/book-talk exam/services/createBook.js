const Book = require('../model/Book');

exports.getAll = () => Book.find({});
exports.create = (bookData) => Book.create(bookData);
exports.getOneDetails = (bookId) => Book.findById(bookId).populate('owner');
exports.getOne = (bookId) => Book.findById(bookId);
exports.wish = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    book.wishList.push(userId);
    return book.save();
};
exports.update = async (bookId, bookData) => Book.findByIdAndUpdate({ _id: bookId }, { $set: bookData }, { runValidators: true });
exports.delete = async (bookId) => Book.findByIdAndDelete(bookId);