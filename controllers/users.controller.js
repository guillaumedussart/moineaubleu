const User = require('../models/User');
const { findUser, saveUser, updateProfil } = require('../queries/users.queries');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const uploadsFolder = path.resolve('public/uploads/');
exports.usersPage = (req, res) => {
        User.find().then(users => {
            res.render('users-list', { users });
        }).catch(error => {
            console.error(error);
            res.render('users-list');
        });
    }
    /*
     *
     * page auth return
     * */
exports.signInPage = (req, res) => {
    res.render('auth/login', {
        title: 'Signin'
    });
}
exports.signUpPage = (req, res) => {
    res.render('auth/register', {
        title: 'Signin'
    });
}
exports.profilPage = (req, res, next) => {
    res.render('pages/profile', {
        title: 'Profile',
        session: req.session,
        url: req.originalUrl
    });
}
exports.logoutProfil = (req, res, next) => {
    //req.logout();
    req.session = null;
    res.redirect('/');
}

/*
 *
 * post method
 *
 * */
exports.signUp = async(req, res) => {
    try {
        await saveUser(req.body, req, res);
        res.redirect('/users/signin');
        res.end();
    } catch (e) {
        res.render('/users/signup', {
            error: true,
            errors: [e.message]
        });
    }
}

exports.signIn = async(req, res, next) => {
    try {
        await findUser(req, res);
    } catch (e) {
        res.render('/users/signin', {
            error: true,
            errors: [e.message]
        });
    }
}
exports.updateProfil = async(req, res, next) => {

    let avatar = req.files.photo;
    let newFilename;
    try {
        if (req.files) {
            let pathUploadFile = uploadsFolder + '/' + req.files.photo.name;
            let ext = path.extname(pathUploadFile);

            avatar.mv(pathUploadFile);

            newFilename = req.body.username + ext;

            sharp(req.files.photo.data)
                .resize(200, 200, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`${uploadsFolder }/${newFilename}`);


            fs.unlinkSync(pathUploadFile);
        }
        await updateProfil(req, res, newFilename)
    } catch (e) {
        res.render('pages/profile', {
            session: req.session,
            error: true,
            errors: [e.message]
        });
    }
}