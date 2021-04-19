const router = require('express').Router();
const {checkAuth} = require('../middleware/check-auth.middleware');
const {
	createChirpPage,
	createChirp,
	deleteChirp
} = require('../controllers/chirps.controller');

router.get('/new',checkAuth, createChirpPage);
router.post('/new', checkAuth,createChirp);
router.get('/delete/:id', checkAuth,deleteChirp);

module.exports = router;