const router = require('express').Router();
const {checkAuth} = require('../middleware/check-auth.middleware');
const {
	createChirpPage,
	createChirp,
	deleteChirp,
	editChirp,
	updateChirp
} = require('../controllers/chirps.controller');

router.get('/new',checkAuth, createChirpPage);
router.post('/new', checkAuth,createChirp);
router.get('/edit/:id', checkAuth,editChirp);
router.post('/edit/:id', checkAuth,updateChirp);
router.get('/delete/:id', checkAuth,deleteChirp);
router.delete('/delete/:id', checkAuth,deleteChirp);

module.exports = router;