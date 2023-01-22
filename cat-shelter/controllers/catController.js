const Cat = require('../models/Cat');

const getAddBreed = (req, res) => {
   res.render('addBreed');
};

const getAddCat = (req, res) => {
   res.render('addCat');
};

const postAddCat = (req, res) => {
   const { name, description, imageUrl, breed } = req.body;
   let cat = new Cat(name, description, imageUrl, breed );
   Cat.save(cat);
   console.log(req.body);
   res.redirect('/');
}

const postAddBreed = (req, res) => {
   res.send('Form submitted');
};


module.exports = {
   getAddBreed,
   getAddCat,
   postAddBreed,
   postAddCat
}