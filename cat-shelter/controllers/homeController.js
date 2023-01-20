const db = require('../catdb.json');

const getHomePage = (req, res) => {
   res.render('home');
};

const getAddBreedPage = (req, res) => {
   res.render('addBreed');
}

const getAddCatPage = (req, res) => {
   res.render('addCat');
}

module.exports = {
   getHomePage,
   getAddBreedPage,
   getAddCatPage
}