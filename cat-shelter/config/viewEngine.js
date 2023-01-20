const hbs = require('express-handlebars');

function engineSetup(app) {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', '../cat-shelter/views');
}

module.exports = engineSetup;