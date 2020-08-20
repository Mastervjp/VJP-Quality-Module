const express = require('express')
const router = express.Router()

const { ProductCharacteristics } = require('./../../models')


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
        ProductCharacteristics.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {
        ProductCharacteristics.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.put('/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        ProductCharacteristics.update(req.body, { where: { id: req.params.id} }).then(result => {
            sendSuccess(res, "Data updated");
        }).catch(function(err) {
            sendError(res, err);
        });
    })
})

router.delete('/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        ProductCharacteristics.destroy({ where: { id: req.params.id} }).then(result => {
            sendSuccess(res, "Data deleted");
        }).catch(function(err) {
            sendError(res, err);
        });
    })
})


module.exports = router