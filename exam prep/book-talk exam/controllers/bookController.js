const router = require('express').Router();
const { isAuthorized } = require('../middleware/auth');
const createBook = require('../services/createBook');
const { getErrorMessage } = require('../util/errors');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/books/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/books/create', isAuthorized, async (req, res) => {
    const bookData = { ...req.body, owner: req.user._id };

    try {
        await createBook.create(bookData);

        res.redirect('/books/catalog');

    } catch (error) {
        return res.render('create', { ...bookData, error: getErrorMessage(error) });
    }
});

router.get('/books/catalog', async (req, res) => {
    const books = await createBook.getAll().lean();

    res.render('catalog', { books });
});

router.get('/book/:bookId/details', async (req, res) => {
    const book = await createBook.getOneDetails(req.params.bookId).lean();

    const isCreator = book.owner._id == req.user?._id;
    const isWished = book.wishList?.some(id => id == req.user?._id);

    res.render('details', { ...book, isCreator, isWished });
});

router.get('/book/:bookId/edit', isAuthorized, async (req, res) => {
    const book = await createBook.getOne(req.params.bookId).lean();

    if (book.owner != req.user?._id) {
        return res.render('404');
    }

    res.render('edit', { ...book });
});

router.post('/book/:bookId/edit', isAuthorized, async (req, res) => {
    try {
        await createBook.update(req.params.bookId, req.body);

        res.redirect(`/book/${req.params.bookId}/details`);

    } catch (error) {
        res.render('edit', { ...req.body, error: getErrorMessage(error) });
    }
});

router.get('/book/:bookId/wish', isAuthorized, async (req, res) => {
    await createBook.wish(req.params.bookId, req.user._id);

    res.redirect(`/book/${req.params.bookId}/details`);
});

router.get('/book/:bookId/delete', isAuthorized, async (req, res) => {
    const book = await createBook.getOne(req.params.bookId).lean();

    if (book.owner != req.user?._id) {
        return res.render('404');
    }

    await createBook.delete(req.params.bookId);

    res.redirect('/books/catalog');
});

module.exports = router;