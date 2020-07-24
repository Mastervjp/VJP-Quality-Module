const express = require('express')
const router = express.Router()
const {
    ContractReview
} = require('../models')



var error = function (res, err) {
    var result = {
        "success": false,
        "error": err,

    };
    return res.json(result);

}

var success = function (res, result) {
    var final = {
        "success": true,
        "data": result,

    };
    return res.json(final);
}



router.post('/', (req, res) => {

    ContractReview.create(req.body).then(function (result) {
        success(res, result);
    }).catch(function (err) {
        console.log('errrr===>\n\n', err);

        error(res, err);
    });
})



router.get('/one/:id', (req, res) => {

    ContractReview.findOne({ where: { id: req.params.id } }).then(function (result) {
        success(res, result);
    }).catch(function (err) {
        console.log('errrr===>\n\n', err);

        error(res, err);
    });
})
router.put('/status/:id', (req, res) => {
    ContractReview.update(req.body, { where: { id: req.params.id } }).then(result => {
        success(res, result, "Data updated");
    }).catch(function (err) {
        console.log(err)
        error(res, err);
    });
})

router.put('/:id', (req, res) => {
    ContractReview.update(req.body, { where: { id: req.params.id } }).then(result => {
        success(res, result, "Data updated");
    }).catch(function (err) {
        console.log(err)
        error(res, err);
    });
})

router.get('/', (req, res) => {

    ContractReview.findAll().then(function (result) {
        success(res, result);
    }).catch(function (err) {
        console.log('errrr===>\n\n', err);

        error(res, err);
    });
})


module.exports = router;