const db = require('../db.json')

const getHomePage = (req, res) => {
    const { search, from: difficultyFrom, to: difficultyTo} = req.query;
    let cubes = db.cubes;

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }

    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }

    res.render('index', { cubes, search, difficultyFrom, difficultyTo });
};

const getAboutPage = (req, res) => {
    res.render('about');
};

const getErrorPage = (req, res) => {
    res.render('404');
}

module.exports = {
    getHomePage,
    getAboutPage,
    getErrorPage
}