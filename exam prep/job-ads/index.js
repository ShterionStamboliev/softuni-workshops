const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://127.0.0.1:27017/ad`);

app.listen(3000, () => console.log('Server listening...'));