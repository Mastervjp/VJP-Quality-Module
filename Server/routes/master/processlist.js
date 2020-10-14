const express = require('express')
const router = express.Router()

const { ProcessList } = require('./../../models')


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

router.post('/', (req, res) => {

    return new Promise((resolve, reject) => {
        ProcessList.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

module.exports = router