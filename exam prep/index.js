const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./config/routes');
const { dbStart } = require('./config/db');

const app = express();
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(routes);

dbStart();

app.listen(3000, () => console.log('Server running on...'));