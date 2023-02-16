const Ad = require('../model/Ad');

exports.getAllAds = () => Ad.find({});
exports.createAd = (adData) => Ad.create(adData);
exports.getById = (adId) => Ad.findById(adId);