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
    const adData = { ...req.body, author: req.user._id };

    try {
        await adService.createAd(adData);
        res.redirect('/ads/all');
    } catch (error) {
        return res.render('create', { ...adData, error: getErrorMessage(error) });
    }
});

router.get('/ad/:adId/details', async (req, res) => {
    const adId = await adService.getOneDetails(req.params.adId).lean();
    const isAuthor = req.user?._id == adId.author._id;
    res.render('details', { ...adId, author: adId.author.email, isAuthor });
});

router.get('/ad/:adId/apply', isAuthorized, async (req, res) => {
    await adService.hasApplied(req.user._id, req.params.adId);

    res.redirect(`/ad/${req.params.adId}/details`);

});


module.exports = router;