const express = require('express')
const router = express.Router()

const { Drawing } = require('./../models')


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

function sendSuccess1(res, result,msg) {
    var finalResult = {
        "success": true,
        "msg":msg,
        "data": result
    };
    return res.json(finalResult);
}

router.get('/', (req, res) => {
    return new Promise((resolve, reject) => {
        Drawing.findAll({ where: { deleteStatus: false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {

    req.body.createdBy = 1;
    
    return new Promise((resolve, reject) => {
        Drawing.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.put('/:id', (req, res) => {

    req.body.updatedBy = 1;
    return new Promise((resolve, reject) => {
        Drawing.update(req.body, { where: { id: req.params.id} }).then(result => {
            sendSuccess1(res, result,"Data updated");
        }).catch(function(err) {
            console.log(err)
            sendError(res, err);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Drawing.update({deletedBy:1,deleteStatus:true},{ where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router