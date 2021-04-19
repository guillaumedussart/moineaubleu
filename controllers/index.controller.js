const {getAllChirps} = require('../queries/chirps.queries');


exports.indexController = async(req, res) => {
   const chirps = await getAllChirps();

    res.render('pages/index', {
        title: 'Moineau bleu',
        session: req.session,
        chirps: chirps
    });
};