const Ad = require('../model/Ad');
const User = require('../model/User');

exports.getAllAds = () => Ad.find({});
exports.createAd = (adData) => Ad.create(adData);
exports.getById = (adId) => Ad.findById(adId);
exports.getOneDetails = (adId) => Ad.findById(adId).populate('author');
exports.hasApplied = async (userId, adId) => {
    const ad = await Ad.findById(adId);
    ad.applied.push(userId);
    return ad.save();
};