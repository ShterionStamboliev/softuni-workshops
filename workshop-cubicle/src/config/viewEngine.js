const hbs = require('express-handlebars');

function engineSetup(app) {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', '../src/views')
}

module.exports = engineSetup;