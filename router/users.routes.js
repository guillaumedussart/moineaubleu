const router = require('express').Router();
const {
	signInPage,
	signUpPage,
	signUp,
	signIn,
	profilPage,
	updateProfil,
	logoutProfil
} = require('../controllers/users.controller');

router.get('/signin', signInPage);
router.post('/signin', signIn);
router.get('/signup', signUpPage);
router.post('/signup', signUp);
router.get('/profile/:username', profilPage);
router.post('/updateProfil', updateProfil);
router.get('/logout', logoutProfil);

module.exports = router;
