const twig = require("twig");
const express = require('express');
const { resolve } = require('path');
const router = require('./router');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//const multer = require('multer');
//const upload = multer({ dest: __dirname + '/public/uploads/' });
require('./models');

const app = express();


/*
 * uploads
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array());
//session
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

// Configuration
app.set('view engine', 'twig');
app.engine('twig', twig.__express);
app.set('views', 'templates');
/**
 *
 * implement jquery/bootstrap
 *
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

/*
 *
 *
 * implement public folder
 *
 * */
app.use('/static', express.static(resolve('public')));
app.use('/', router);
module.exports = app;