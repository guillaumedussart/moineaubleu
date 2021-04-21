const router = require('express').Router();
const {checkAuth} = require('../middleware/check-auth.middleware');

const {
	signInPage,
	signUpPage,
	profilPage,
	logoutProfil
} = require('../controllers/users.controller');
const {
	signUp,
	signIn,
	updateProfil,
	followUser,
	searchProfil
} = require('../controllers/posts.controller');

router.get('/signin', signInPage);
router.post('/signin', signIn);
router.get('/signup', signUpPage);
router.post('/signup', signUp);
router.get('/profile/:username', checkAuth, profilPage);
router.post('/updateProfil',checkAuth, updateProfil);
router.get('/logout',checkAuth, logoutProfil);
router.post('/follow',checkAuth, followUser);

router.post('/search',checkAuth,searchProfil)

module.exports = router;
