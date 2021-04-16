const Chirp = require('../models/Chirp');
const User = require('../models/User');
const {decode} = require('jwt-simple');
const {jwt: {secret}} = require('../environement');


exports.homePageCtrl = async(req, res) => {
    const chirps = await Chirp.find().populate('author').exec();

    res.render('pages/index', {
        title: 'Moineau bleu',
        session: req.session,
        chirps: chirps
    });
};