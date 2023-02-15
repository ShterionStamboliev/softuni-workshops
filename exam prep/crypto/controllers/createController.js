const router = require('express').Router();
const { isAuthorized } = require('../middleware/auth');
const createService = require('../services/createService');
const { getErrorMessage } = require('../util/errors');
const { paymentMethodMapper } = require('../constants');

router.get('/bitcoins/catalog', async (req, res) => {
    const bitcoins = await createService.getAll().lean();

    res.render('catalog', { bitcoins });
});

router.get('/bitcoins/:bitcoinId/details', async (req, res) => {
    const bitcoin = await createService.getOneDetails(req.params.bitcoinId).lean();

    const isCreator = bitcoin.owner._id == req.user?._id;
    const isBuyer = bitcoin.buyCrypto?.some(id => id == req.user?._id);

    res.render('details', { ...bitcoin, isCreator, isBuyer });
});

router.get('/bitcoins/:bitcoinId/buy', isAuthorized, async (req, res) => {
    await createService.buy(req.user._id, req.params.bitcoinId);

    res.redirect(`/bitcoins/${req.params.bitcoinId}/details`);

});

router.get('/bitcoins/:bitcoinId/edit', isAuthorized, async (req, res, next) => {
    const bitcoin = await createService.getOne(req.params.bitcoinId).lean();

    const paymentMethods = Object.keys(paymentMethodMapper).map(key => ({
        value: key,
        label: paymentMethodMapper[key],
        isSelected: bitcoin.payment == key
    }));

    if (bitcoin.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: '401' });
    }

    res.render('edit', { ...bitcoin, paymentMethods });
});

router.post('/bitcoins/:bitcoinId/edit', isAuthorized, async (req, res) => {

    try {
        await createService.update(req.params.bitcoinId, req.body);
        
        
        res.redirect(`/bitcoins/${req.params.bitcoinId}/details`);

    } catch (err) {
        res.render('edit', { ...req.body, paymentMethods, err: getErrorMessage(err) })
    }

});

router.get('/bitcoins/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/bitcoins/create', isAuthorized, async (req, res) => {
    const offerData = { ...req.body, owner: req.user._id };

    try {
        await createService.create(offerData);

        res.redirect('/bitcoins/catalog');

    } catch (err) {
        return res.render('create', { ...req.body, err: getErrorMessage(err) });
    }
});

router.get('/bitcoins/:bitcoinId/delete', isAuthorized, async (req, res, next) => {

    const bitcoin = await createService.getOne(req.params.bitcoinId).lean();

    if (bitcoin.owner != req.user._id) {
        return next({ message: 'You are not the owner of this coin', status: 401 });
    }

    await createService.delete(req.params.bitcoinId);
    res.redirect('/bitcoins/catalog');
});

module.exports = router;