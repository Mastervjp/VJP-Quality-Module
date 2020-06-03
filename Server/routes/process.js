const express = require('express')
const router = express.Router()

const { Drawing, Operation,PlanAbstract, Process, Instrument,MeasuringFrequency } = require('./../models')


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
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo,altProcess: false,addKind: false,deleteStatus: false }, order: [['baloonNo', 'ASC']],}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/altprocess/:drgCode/:opnNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo,altProcess: true,addKind: false,deleteStatus: false }, order: [['baloonNo', 'ASC']],}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/addkind/:drgCode/:opnNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgId: req.params.drgCode, opnId: req.params.opnNo,altProcess: false,addKind: true,deleteStatus: false }, order: [['baloonNo', 'ASC']],}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/fpi/:drgCode/:opnId', (req, res) => {
    return new Promise((resolve, reject) => {
        Process.findAll({ where: { drgCode: req.params.drgCode, opnId : req.params.opnId } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {

        req.body.createdBy = 1;
        // Process.create(req.body).then(function (result) {
        //     sendSuccess1(res, result);
        // }).catch(function (err) {
        //     sendError(res, err);
        // });
        console.log('eeeeeeeeeee pasasssssssssssssssssssssssssssssssssssssssssssssss',req.body)

        PlanAbstract.findOne({where:{drgId : req.body.drgId}}).then(function (resp) {
        
            console.log('test pasasssssssssssssssssssssssssssssssssssssssssssssss',resp)
            if(resp.qpNo){

                console.log('sssssssssssss',req.body)
                Process.create(req.body).then(function (result) {
                    sendSuccess(res, result);
                }).catch(function (err) {
                    sendError(res, err);
                });

               
               
            }
            else{

                let pp = 'QP 000'+req.body.drgId+'_A';
                var mydata ={
                    
                    "qpNo" :pp
                }
                PlanAbstract.update(mydata,{where:{drgId : req.body.drgId}}).then(function (paResult) {
                    Process.create(req.body).then(function (result) {
                        sendSuccess(res, result);
                    }).catch(function (err) {
                        sendError(res, err);
                    });
                })
               

            }
        
        })







    })
})



router.put('/func/plan/:id', function (req, res) {
    return new Promise(function (resolve, reject) {

        Drawing.findOne({ where: { id: req.params.id } }).then(dResult => {

            if (dResult.qpStatus) {
                PlanAbstract.findOne({ where: { drgId: dResult.id } }).then(planRes => {
                    console.log('ppppppppppp', planRes);

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
                    sendSuccess(res, result);
                }).catch(function (err) {
                    sendError(res, err);
                });
            }

        }).catch(function (err) {
            console.log("last err", err);
            sendError(res, err);
        });




        // Drawing.update({qpStatus:true},{ where: { id: req.params.id } }).then((result) => {
        //     sendSuccess(res, 'updated sucessfully');
        // }).catch(function (err) {
        //     sendError(res, err);
        // });



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