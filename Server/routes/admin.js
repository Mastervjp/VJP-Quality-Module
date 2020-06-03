const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

const { User } = require('./../models')


function sendError(res, err) {
    var result = {
        "success": false,
        "error": err
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "data": result
    };
    return res.json(finalResult);
}



router.get('/', (req, res) => {
    return new Promise((resolve, reject) => {
        User.findAll({ where: { role: ["NA", "NU"],deleteStatus:false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


function signupProcess(req, res, next) {
    return passport.authenticate('local-signup', (result) => {


        if (result == null) {
            return res.json({
                success: false,
                message: 'Please fill all the details!'
            })
        }
        if (!result.success) {
            if (result.message != null) {
                return res.json({
                    success: false,
                    message: result.message
                })
            } else {
                return res.json({
                    success: false,
                    message: "Unknown error occurred!"
                })
            }
        }
        return res.status(200).json({
            success: true,
            message: 'You have successfully created User',
            errors: {}
        })


    })(req, res, next)
}

router.post('/signup', (req, res, next) => {
    if (req.body.name == '' || req.body.name == null || !req.body.name) {
        return res.json({
            success: false,
            message: "Please enter name!!",
        })
    } else if (req.body.name.length < 3) {
        return res.json({
            success: false,
            message: "Name required minimun three characters!!",
        })
    } else if (req.body.email == null || req.body.email == "") {
        return res.json({
            success: false,
            message: "Please enter email!!",
        })
    } else if (req.body.password == null || req.body.password.length < 3) {
        return res.json({
            success: false,
            message: "Password requires atleast three characters!!",
        })
    }

    signupProcess(req, res, next);

})

router.put('/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { id: req.params.id } }).then(function (result) {
            if (result.password === req.body.password) {
                User.update(req.body, { where: { id: req.params.id } }).then(result1 => {
                    sendSuccess(res, "Data updated");
                }).catch(function (err) {

                    console.log(err)
                    sendError(res, err);
                });
            }
            else {

                bcrypt.hash(req.body.password, 8, (err, hash) => {
                    if (err)
                        sendError(res, error);

                    req.body.password = hash;
                    User.update(req.body, { where: { id: req.params.id } }).then(result3 => {
                        sendSuccess(res, "Data updated");
                    }).catch(function (err) {
                        sendError(res, err);
                    });
                })

            }
            
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        User.update({deletedBy:1,deleteStatus:true},{ where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router