const express = require('express')
const router = express.Router()

const { QualityPlan,PlanAbstract,Drawing, Operation, Process } = require('./../models')


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


router.get('/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        PlanAbstract.findAll({ where: { drgId: req.params.drgId }}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/drawing/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        Drawing.findAll({ where: { Id: req.params.drgId }}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {
        req.body.createdBy = 1;
        PlanAbstract.create(req.body).then(function (result) {
            sendSuccess1(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.put('/plan/:pfNo', (req, res) => {
    PlanAbstract.update(req.body, { where: { pfNo: req.params.pfNo } }).then(result => {
        sendSuccess1(res, result, "Data updated");
    }).catch(function (err) {
        console.log(err)
        error(res, err);
    });
})

router.put('/plan/sample/:drgId', (req, res) => {
    PlanAbstract.update(req.body, { where: { drgId: req.params.drgId } }).then(result => {
        sendSuccess1(res, result, "Data updated");
    }).catch(function (err) {
        console.log(err)
        error(res, err);
    });
})

router.put('/:id', (req, res) => {

    req.body.updatedBy = 1;
    return new Promise((resolve, reject) => {
        QualityPlan.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, error);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        QualityPlan.update({ deletedBy: 1, deleteStatus: true }, { where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router