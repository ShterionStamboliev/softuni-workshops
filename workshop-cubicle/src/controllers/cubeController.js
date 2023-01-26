const Cube = require('../models/Cube');
const db = require('../db.json');

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

module.exports = {
    getCreateCube,
    postCreateCube,
    getCubeDetails
}