const express = require('express')
const router = express.Router()

const { Instrument } = require('./../../models')
const fs = require('fs')
var uniqid = require('uniqid');
const fileUpload = require('express-fileupload');
var path = require('path')

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
        Instrument.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {

    // return new Promise((resolve, reject) => {
    //     Instrument.create(req.body).then(function (result) {
    //         sendSuccess(res, result);
    //     }).catch(function (err) {
    //         sendError(res, err);
    //     });
    // })

    return new Promise(function (resolve, reject) {

        var checkpath = "../uploads";
        if (!fs.existsSync(checkpath)) {
            fs.mkdirSync(checkpath);
        }
        checkpath = checkpath + '/instrument';
        if (!fs.existsSync(checkpath)) {
            fs.mkdirSync(checkpath);
        }

        var uploadImage = req.files.fileKey;

        var imageName = uploadImage.name;
        var ext = path.extname(imageName)
        var newfilename = uniqid('_') + ext;                 // change 
        var filepath = __dirname + "/../../../uploads/instrument/" + newfilename;

        return fileuploads(uploadImage, filepath).then(function (fileuploadsResult) {

            req.body.insImage = newfilename;
            Instrument.create(req.body).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        }).catch(function (err) {
            sendError(res, 'error occurred in file upload');
            console.log('File upload error == >:', err);
        })

    })


})


function fileuploads(uploadImage, filepath) {
    return new Promise(function (resolve, reject) {
        try {
            uploadImage.mv(filepath, function (err) {
                if (err) return reject(err);
                else
                    return resolve(filepath)
            });
        } catch (err) {
            return reject(err);
        }
    });
}


router.put('/:id', (req, res) => {



    var checkpath = "../uploads";
    if (!fs.existsSync(checkpath)) {
        fs.mkdirSync(checkpath);
    }
    checkpath = checkpath + '/instrument';
    if (!fs.existsSync(checkpath)) {
        fs.mkdirSync(checkpath);
    }


    if(req.files){
        var uploadImage = req.files.fileKey;

        var imageName = uploadImage.name;
        var ext = path.extname(imageName)
        var newfilename = uniqid('_') + ext;                 // change 
        var filepath = __dirname + "/../../../uploads/instrument/" + newfilename;
    
        return fileuploads(uploadImage, filepath).then(function (fileuploadsResult) {
    
            req.body.insImage = newfilename;
    
    
            Instrument.update(req.body, { where: { id: req.params.id } }).then(result => {
                sendSuccess(res, "Data updated");
            }).catch(function (err) {
                sendError(res, err);
            });
    
    
        }).catch(function (err) {
            sendError(res, 'error occurred in file upload');
            console.log('File upload error == >:', err);
        })

    }
    else{

        Instrument.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess(res, "Data updated");
        }).catch(function (err) {
            sendError(res, err);
        });
    }






    // return new Promise((resolve, reject) => {
    //     Instrument.update(req.body, { where: { id: req.params.id} }).then(result => {
    //         sendSuccess(res, "Data updated");
    //     }).catch(function(err) {
    //         sendError(res, err);
    //     });
    // })
})

router.delete('/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        Instrument.destroy({ where: { id: req.params.id } }).then(result => {
            sendSuccess(res, "Data deleted");
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})





module.exports = router