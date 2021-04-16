const router = require('express').Router();
const {
	createChirpPage,
	createChirp
} = require('../controllers/chirps.controller');

router.get('/new', createChirpPage);
router.post('/new', createChirp);

module.exports = router;