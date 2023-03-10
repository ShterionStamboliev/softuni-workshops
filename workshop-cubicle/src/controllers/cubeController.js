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
    const cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();

    if (!cube) {
        return res.redirect('/404');
    }
        res.render('details', { cube });
}

const getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({ _id: {$nin: cube.accessories }}).lean();

    res.render('attachAccessory', { cube, accessories });
};

const postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;
    cube.accessories.push(accessoryId);

    await cube.save();
    res.redirect(`/cubes/${cube._id}/details`);
}

module.exports = {
    getCreateCube,
    postCreateCube,
    getCubeDetails,
    getAttachAccessory,
    postAttachAccessory
}
