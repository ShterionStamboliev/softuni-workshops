const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Hotel details'
    })
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create hotel'
    })
});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit hotel'
    })
});

module.exports = hotelController;