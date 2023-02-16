const router = require('express').Router();
const { isAuthorized } = require('../middleware/auth');
const adService = require('../services/adService');
const { getErrorMessage } = require('../util/errors');

router.get('/ads/all', async (req, res) => {
    const ads = await adService.getAllAds().lean();
    res.render('all-ads', { ads });
});

router.get('/ad/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/ad/create', isAuthorized, async (req, res) => {
    // console.log(req.user.email);
    const adData = { ...req.body, email: req.user.email };

    try {
        await adService.createAd(adData);
        res.redirect('/ads/all');
    } catch (error) {
        return res.render('create', { ...adData, error: getErrorMessage(error) });
    }
});

router.get('/ad/:adId/details', isAuthorized, async (req, res) => {
    const adId = await adService.getById(req.params.adId).lean();

    const isAuthor = req.user?._id == adId.author?._id;
    console.log(isAuthor);
    res.render('details', { ...adId, isAuthor });
});


module.exports = router;