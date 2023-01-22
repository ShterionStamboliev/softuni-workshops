const db = require('../catdb.json');

const getHomePage = (req, res) => {
   res.render('home', { cats: db.cats });
};

module.exports = {
   getHomePage,
}