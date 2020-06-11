const express = require('express')
const router = express.Router()

const { OperationList, Operation, Machining, Material,Process, WorkCenter, MeasuringFrequency, Instrument, PlanAbstract, Drawing, DrawingType } = require('./../models')


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
        Operation.findAll({ where: { drgId: req.params.drgId, altProcess: false, addKind: false, deleteStatus: false }, order: [['opnNo', 'ASC']], }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/altprocess/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        Operation.findAll({ where: { drgId: req.params.drgId, altProcess: true, addKind: false, deleteStatus: false }, order: [['opnNo', 'ASC']], }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/kindprocess/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        Operation.findAll({ where: { drgId: req.params.drgId, altProcess: false, addKind: true, deleteStatus: false }, order: [['opnNo', 'ASC']], }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/data/workcenter', (req, res) => {
    return new Promise((resolve, reject) => {
        Machining.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})
router.get('/data/oplist', (req, res) => {
    return new Promise((resolve, reject) => {
        OperationList.findAll().then(function (result) {
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

router.get('/data/instrument', (req, res) => {
    return new Promise((resolve, reject) => {
        Instrument.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/data/drawingtype', (req, res) => {
    return new Promise((resolve, reject) => {
        DrawingType.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/data/material', (req, res) => {
    return new Promise((resolve, reject) => {
        Material.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/data/machine', (req, res) => {
    return new Promise((resolve, reject) => {
        Machining.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

// router.get('/process/:drgCode/:opnNo', (req, res) => {
//     return new Promise((resolve, reject) => {
//         Process.findAll({ where: { drgCode: req.params.drgCode, opnNo: req.params.opnNo } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })

// router.get('/fpi/:drgCode/', (req, res) => {
//     return new Promise((resolve, reject) => {
//         Process.findAll({ where: { drgCode: req.params.drgCode } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {
        req.body.createdBy = 1;

        PlanAbstract.findOne({ where: { drgId: req.body.drgId } }).then(function (resp) {

            if (resp) {
                Operation.create(req.body).then(function (result) {
                    sendSuccess1(res, result);
                }).catch(function (err) {
                    console.log(err);
                    sendError(res, err);
                });
            }
            else {

                Drawing.findOne({ where: { id: req.body.drgId } }).then(function (dres) {

                    var newpfNo = '';

                    let code = dres.id;

                    var n = code.toString().length

                    if (n == 1) {
                        newpfNo = "PP 000000" + code + "-10A"
                    }
                    else if (n == 2) {
                        newpfNo = "PP 00000" + code + "-10A"
                    }
                    else if (n == 3) {
                        newpfNo = "PP 0000" + code + "-10A"
                    }
                    else if (n == 4) {
                        newpfNo = "PP 000" + code + "-10A"
                    }
                    else if (n == 5) {
                        newpfNo = "PP 00" + code + "-10A"
                    }
                    else if (n == 6) {
                        newpfNo = "PP 0" + code + "-10A"
                    }
                    else {
                        newpfNo = "PP " + code + "-10A"
                    }


                    var mydata = {
                        "drgId": req.body.drgId,
                        "pfNo": newpfNo
                    }
                    PlanAbstract.create(mydata).then(function (paResult) {
                        Operation.create(req.body).then(function (result) {
                            sendSuccess(res, result);
                        }).catch(function (err) {
                            console.log(err);
                            sendError(res, err);
                        });
                    })


                })


            }

        })


    })
})


router.put('/pfstatus/:id', (req, res) => {

    req.body.updatedBy = 1;

    return new Promise((resolve, reject) => {

        Drawing.findOne({ where: { id: req.params.id } }).then(dResult => {

            if (dResult.pfStatus) {
                PlanAbstract.findOne({ where: { drgId: dResult.id } }).then(planRes => {

                    var newpfno = "";
                    var pf = planRes.pfNo
                    var nameArr = pf.split('_');
                    if (nameArr.length > 1) {
                        let part2 = nameArr[1];
                        var part2Arr = part2.split('')
                        var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        var lastchar = part2Arr[1];
                        var index = alpha.indexOf(lastchar);

                        newpfno = nameArr[0] + '_' + part2Arr[0] + alpha[index + 1]

                        PlanAbstract.update({ pfNo: newpfno }, { where: { id: planRes.id } }).then(upres => {

                            Drawing.update({ pfStatus: 1 }, { where: { id: dResult.id } }).then(result => {
                                sendSuccess(res, result);
                            }).catch(function (err) {
                                sendError(res, err);
                            });

                        })

                    }
                    else {
                        let pfnum = nameArr[0] + '_' + nameArr[1] + 'A'
                        Drawing.update({ pfStatus: 1 }, { where: { id: req.params.id } }).then(result => {
                            sendSuccess(res, result);
                        }).catch(function (err) {
                            sendError(res, err);
                        });
                    }
                })

            }
            else {
                Drawing.update({ pfStatus: 1 }, { where: { id: req.params.id } }).then(result => {
                    sendSuccess(res, result);
                }).catch(function (err) {
                    sendError(res, err);
                });
            }

        }).catch(function (err) {
            console.log("last err", err);
            sendError(res, err);
        });

        // Drawing.update({pfStatus : 1}, { where: { id: req.params.id } }).then(result => {
        //     sendSuccess(res, result);
        // }).catch(function (err) {
        //     sendError(res, error);
        // });


    })
})

router.put('/func/plan/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Drawing.update({ pfStatus: true }, { where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'updated sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})



router.put('/:id', (req, res) => {

    req.body.updatedBy = 1;
    return new Promise((resolve, reject) => {
        Operation.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess1(res, result, "Data successfully updated");
        }).catch(function (err) {
            sendError(res, error);
        });
    })
})


router.delete('/:id', function (req, res) {
    return new Promise(function (resolve, reject) {
        Operation.update({ deletedBy: 1, deleteStatus: true }, { where: { id: req.params.id } }).then((result) => {
            sendSuccess(res, 'deleted sucessfully');
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})



router.post('/copy', (req, res) => {
    return new Promise((resolve, reject) => {

        var result = [];
        let cards = req.body.data

        cards.map(function (card) {
            Operation.create({
                drgId: req.body.drgid,
                opnNo: card.opnNo,
                opnName: card.opnName,
                description: card.description,
                workCenter: card.workCenter

            })
                .then(function (cres) {

                    Process.findAll({ where: { opnId: card.id, drgId: card.drgId } }).then((pres) => {


                        pres.forEach(element => {

                            element.drgId = req.body.drgid;
                            element.opnId = cres.id;

                        });
                        pres.map(function (pros) {

                            Process.create({
                                opnName: pros.opnName,
                                description : pros.description,
                                baloonNo : pros.baloonNo,
                                specification : pros.specification,
                                toloreanceGrade : pros.toloreanceGrade,
                                tolFrom : pros.tolFrom,
                                tolTo : pros.tolTo,
                                instrument : pros.instrument,
                                measuringFrequency : pros.measuringFrequency,
                                grid : pros.grid,
                                firstPartInspection : pros.firstPartInspection,
                                periodicInspection : pros.periodicInspection,
                                ctq : pros.ctq,
                                pdi : pros.pdi,
                                cfir : pros.cfir,
                                opnId : pros.opnId,
                                drgId : pros.drgId,
                                

                            })

                        }).then(function (ppres) {
                        
                        })


                    })
                    if(cres){
                    sendSuccess(res, cres);

                    }

                })
           
        

        });





        // Operation.create(req.body).then(function (result) {
        //     sendSuccess(res, result);
        // }).catch(function (err) {
        //     console.log(err);
        //     sendError(res, err);
        // });


    })
})

module.exports = router