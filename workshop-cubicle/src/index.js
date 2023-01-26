const express = require('express');

const routes = require('./routes')
const port = require('./config/config');
const engine = require('./config/viewEngine');
const db = require('./config/db');

const app = express();
engine(app);

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(routes);


db()
    .then(() => app.listen(port.PORT, () => console.log(`Server is running on port ${port.PORT}...`)))
    .catch((err) => console.log(err));