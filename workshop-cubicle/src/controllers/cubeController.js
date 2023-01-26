const Cube = require('../models/Cube');
const Accessory = require('../models/Accessories');

const getCreateCube = (req, res) => {
    res.render('create');
};

const postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save();

    res.redirect('/');
};

const getCubeDetails = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    if (!cube) {
        return res.redirect('/404');
    }
        res.render('details', { cube });
}

const getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find().lean();

    res.render('attachAccessory', { cube, accessories });
}

module.exports = {
    getCreateCube,
    postCreateCube,
    getCubeDetails,
    getAttachAccessory
}
