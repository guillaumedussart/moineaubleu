const twig = require("twig");
const express = require('express');
const { resolve } = require('path');
const router = require('./router');
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
require('./models');

const app = express();


/*
* uploads
* */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
//session


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
app.use(express.urlencoded({extended:true}))
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
