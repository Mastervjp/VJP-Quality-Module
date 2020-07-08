const express = require('express')
const router = express.Router()

const { MarketCard,Instrument, MarketPurchase,Operation, Process } = require('./../models')


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

function sendSuccess1(res, result, msg) {
    var finalResult = {
        "success": true,
        "msg": msg,
        "data": result
    };
    return res.json(finalResult);
}


// router.get('/:drgCode/:opnNo', (req, res) => {
//     return new Promise((resolve, reject) => {

//         console.log('all process=============>',req.body);
        
//         Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo }}).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })

// router.get('/fpi/:drgCode/', (req, res) => {
//     return new Promise((resolve, reject) => {
//         console.log('all fpi=============>',req.params.drgCode);

//         Process.findAll({ where: { drgId: req.params.drgCode } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })



router.get('/fpi/:drgCode/:opnId', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId : req.params.opnId, deleteStatus : false },include: [Instrument] }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/fir/:drgCode', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, deleteStatus : false },include: [Instrument] }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/routecard/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        MarketCard.findAll({ where: { drgId: req.params.drgId}}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/marketdata/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        MarketPurchase.findOne({ where: { id: req.params.id}}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router