const express = require('express')
const router = express.Router()

const { Drawing, Operation, PlanAbstract, Process, Instrument, MeasuringFrequency } = require('./../models')


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


router.get('/:drgCode/:opnNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo, altProcess: false, addKind: false, deleteStatus: false }, }).then(function (result) { //order: [['baloonNo', 'ASC']], 
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/altprocess/:drgCode/:opnNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo, altProcess: true, addKind: false, deleteStatus: false }, }).then(function (result) { //order: [['baloonNo', 'ASC']], 
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/addkind/:drgCode/:opnNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo, altProcess: false, addKind: true, deleteStatus: false },}).then(function (result) { // order: [['baloonNo', 'ASC']], 
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/fpi/:drgCode/:opnId', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgCode: req.params.drgCode, opnId: req.params.opnId } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {

        req.body.createdBy = 1;

        console.log("body ===>", req.body);
        Process.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });

        // PlanAbstract.findOne({ where: { drgId: req.body.drgId } }).then(function (resp) {


        //     console.log("\n\n \n res  ===>", resp);

        //     if (resp.qpNo) {

        //         Process.create(req.body).then(function (result) {
        //             sendSuccess(res, result);
        //         }).catch(function (err) {
        //             sendError(res, err);
        //         });
        //     }
        //     else {
        //         Process.create(req.body).then(function (result) {
        //             sendSuccess(res, result);
        //         }).catch(function (err) {
        //             sendError(res, err);
        //         });

        //     //     let pp = '';

        //     //     let code = req.body.drgId



        //     //     var n = code.toString().length

        //     //     if (n == 1) {
        //     //         pp = "QP 000000" + code + "-10AA"
        //     //     }
        //     //     else if (n == 2) {
        //     //         pp = "QP 00000" + code + "-10AA"
        //     //     }
        //     //     else if (n == 3) {
        //     //         pp = "QP 0000" + code + "-10AA"
        //     //     }
        //     //     else if (n == 4) {
        //     //         pp = "QP 000" + code + "-10AA"
        //     //     }
        //     //     else if (n == 5) {
        //     //         pp = "QP 00" + code + "-10AA"
        //     //     }
        //     //     else if (n == 6) {
        //     //         pp = "QP 0" + code + "-10AA"
        //     //     }
        //     //     else {
        //     //         pp = "QP " + code + "-10AA"
        //     //     }



        //     //     var mydata = {

        //     //         "qpNo": pp
        //     //     }
        //     //     PlanAbstract.update(mydata, { where: { drgId: req.body.drgId } }).then(function (paResult) {
        //     //         Process.create(req.body).then(function (result) {
        //     //             sendSuccess(res, result);
        //     //         }).catch(function (err) {
        //     //             sendError(res, err);
        //     //         });
        //     //     })


        //     }

        // })







    })
})



router.put('/func/plan/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Drawing.findOne({ where: { id: req.params.id } }).then(dResult => {
            if (dResult.qpStatus) {
                PlanAbstract.findOne({ where: { drgId: dResult.id } }).then(planRes => {
                    var newpfno = "";
                    var pf = planRes.qpNo
                    var nameArr = pf.split('_');
                    if (nameArr.length > 1) {
                        let part2 = nameArr[1];
                        var part2Arr = part2.split('')
                        var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        var lastchar = part2Arr[1];
                        var index = alpha.indexOf(lastchar);
                        newpfno = nameArr[0] + '_' + part2Arr[0] + alpha[index + 1]
                        PlanAbstract.update({ qpNo: newpfno }, { where: { id: planRes.id } }).then(upres => {
                            Drawing.update({ qpStatus: 1 }, { where: { id: dResult.id } }).then(result => {
                                sendSuccess(res, result);
                            }).catch(function (err) {
                                console.log(" pas err", err);
                                sendError(res, err);
                            });
                        })
                    }
                    else {
                        let pfnum = nameArr[0] + '_' + nameArr[1] + 'A'
                        Drawing.update({ qpStatus: 1 }, { where: { id: req.params.id } }).then(result => {
                            sendSuccess(res, result);
                        }).catch(function (err) {
                            sendError(res, err);
                        });
                    }
                })

            }
            else {
                Drawing.update({ qpStatus: 1 }, { where: { id: req.params.id } }).then(result => {
                    var newqpNo = '';
                    let code = req.params.id;
                    var n = code.toString().length
                    if (n == 1) {
                        newqpNo = "QP 000000" + code + "-10AA"
                    }
                    else if (n == 2) {
                        newqpNo = "QP 00000" + code + "-10AA"
                    }
                    else if (n == 3) {
                        newqpNo = "QP 0000" + code + "-10AA"
                    }
                    else if (n == 4) {
                        newqpNo = "QP 000" + code + "-10AA"
                    }
                    else if (n == 5) {
                        newqpNo = "QP 00" + code + "-10AA"
                    }
                    else if (n == 6) {
                        newqpNo = "QP 0" + code + "-10AA"
                    }
                    else {
                        newqpNo = "QP " + code + "-10AA"
                    }

                    PlanAbstract.update({ qpNo: newqpNo }, { where: { drgId: req.params.id } }).then((planRes) => {
                        sendSuccess(res, planRes);
                    })
                }).catch(function (err) {
                    sendError(res, err);
                });
            }

        }).catch(function (err) {
            console.log("last err", err);
            sendError(res, err);
        });
    })
})

router.put('/:id', (req, res) => {

    req.body.updatedBy = 1;
    return new Promise((resolve, reject) => {
        Process.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess1(res, result, "Data successfully updated");
        }).catch(function (err) {
            sendError(res, error);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Process.update({ deletedBy: 1, deleteStatus: true }, { where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/data/instrument', (req, res) => {
    return new Promise((resolve, reject) => {
        Instrument.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/data/measuring', (req, res) => {
    return new Promise((resolve, reject) => {
        MeasuringFrequency.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


module.exports = router