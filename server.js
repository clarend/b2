const express = require('express');
const app = express();
const port = 8001;

const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(path.join(__dirname, './public/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'kidDanger', saveUninitialized: true }));

require('./server/config/mongoose.js');

const routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(port, function () {
    console.log('listening on 8001! ');
});