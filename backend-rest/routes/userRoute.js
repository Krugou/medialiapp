'use strict';
const express = require('express');
const { user_post, getReg_UserDetails, getReg_UserDetailUsername, getReg_UserDetailImage, get_UserProfile, check_token,
    get_UserProfileLimited, deleteUsersReg_User, putNewProfileDetails
} = require('../controllers/userController');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// sekalaisia numeroita tiedostonimien generointiin
const random = (Math.floor(Math.random() * 420) + 69);
const fileStorage = multer.diskStorage({
    // kohdekansio tiedostoille
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // tiedostonimi määrittely
    filename: (req, file, cb) => {
        cb(null, Date.now() + random + path.extname(file.originalname));
    },

});
const upload = multer({
    storage: fileStorage,
    // ei hyväksy yli 100mb kokoisia tiedostoja
    limits: {
        fileSize: 100000000,
    },
    // suodattaan tiedostoja, jotta ne ovat vain kuvia
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },

});


// delete route for user
router.route('/profiledetails/:username').delete(deleteUsersReg_User);
// update route for user
router.route('/profiledetails/:username').
put(upload.single('userImage'),
    body('Username').optional({ checkFalsy: true }).isLength({ min: 3 }).escape(),
    body('oldUsername').optional({ checkFalsy: true }).isLength({ min: 3 }).escape(), putNewProfileDetails);


//AUTHENTIKOINNILLA
router.get('/:username',
    body('username').escape(),
    get_UserProfile)
router.get('/token', check_token);



module.exports = router;


