const Chirp = require('../models/Chirp');
const User = require('../models/User');


exports.homePageCtrl = async(req, res) => {
    let chirps = await Chirp.find().populate('user').exec();
    let users = await User.find().populate("chirps").exec();
    console.log(users);
    res.render('pages/index', {
        title: 'Moineau bleu',
        session: req.session,
        chirps: chirps
    });
};