const router = require('express').Router();
const {checkAuth} = require('../middleware/check-auth.middleware');
const {
	createChirpPage,
	createChirp
} = require('../controllers/chirps.controller');

router.get('/new',checkAuth, createChirpPage);
router.post('/new', checkAuth,createChirp);

module.exports = router;