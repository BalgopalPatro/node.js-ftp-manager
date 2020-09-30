const express = require('express');
require('dotenv').config();

const bodyparser = require('body-parser');
const fs = require('fs')
const multer = require('multer');
const morgan = require('morgan')
const chalk = require('chalk');
const flash = require('connect-flash');
var session = require('express-session');
const upload = multer({ dest: __dirname + '/public/images' });

const app = express();

const PORT = process.env.PORT || 5000;

express.static(__dirname);
app.use(express.static('public'))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'veryverysecret',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.get('/', (req, res) => {
    req.flash("try",'This is a flash')
    res.render('index', {
        message: req.flash("try")
    });
});


app.listen(PORT, (error) => {
    if (error) {
        console.log(chalk.redBright(error));
    } else {
        console.log(chalk.cyan.bold("Serving At PORT", chalk.whiteBright.bgBlack(PORT)));
    }
})