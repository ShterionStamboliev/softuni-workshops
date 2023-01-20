const router = require('express').Router();

router.get('/add-breed/', (req, res) => {
   res.render('addBreed'); 
});

module.exports = router;