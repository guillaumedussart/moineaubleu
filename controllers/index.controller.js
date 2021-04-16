const Chirp = require('../models/Chirp');
const User = require('../models/User');
const {decode} = require('jwt-simple');
const {jwt: {secret}} = require('../environement');


exports.homePageCtrl = async(req, res) => {
    let chirps = await Chirp.find().populate('user').exec();
    //let users = await User.find().populate("chirps").exec();

    res.render('pages/index', {
        title: 'Moineau bleu',
        session: req.session,
        chirps: chirps
    });
};