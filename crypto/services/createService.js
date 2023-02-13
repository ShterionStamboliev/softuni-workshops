const Bitcoin = require('../model/Bitcoin');

exports.getAll = () => Bitcoin.find({});
exports.create = (createData) => Bitcoin.create(createData);
exports.getOne = (bitcoinId) => Bitcoin.findById(bitcoinId);
exports.getOneDetails = (bitcoinId) => Bitcoin.findById(bitcoinId).populate('owner');
exports.update = (bitcoinId, bitcoinData) => Bitcoin.updateOne({ _id: bitcoinId }, { $set: bitcoinData }, { runValidators: true });
exports.buy = async (userId, bitcoinId) => { 
    const bitcoin = await Bitcoin.findById(bitcoinId);
    bitcoin.buyCrypto.push(userId);
    return bitcoin.save();
}

exports.delete = (bitcoinId) => Bitcoin.deleteOne({ _id: bitcoinId });