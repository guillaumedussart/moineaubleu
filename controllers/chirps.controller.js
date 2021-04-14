const Chirp = require('../models/Chirp');


exports.getAllChirp = (req, res) => {
    Chirp.find().then(users => {
        res.render('users-list', { users });
    }).catch(error => {
        console.error(error);
        res.render('users-list');
    });
}