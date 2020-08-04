const express = require('express')
const router = express.Router()
var uniqid = require('uniqid');
var path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload');

const { OperationList, Operation, Machining, Material, Process, WorkCenter, MeasuringFrequency, Instrument, PlanAbstract, Drawing, DrawingType } = require('./../models')


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


        var checkpath = "../uploads";
        if (!fs.existsSync(checkpath)) {
            fs.mkdirSync(checkpath);
        }
        checkpath = checkpath + '/process';
        if (!fs.existsSync(checkpath)) {
            fs.mkdirSync(checkpath);
        }


        var uploadImage1 = req.files.fileKey1;
        var imageName1 = uploadImage1.name;
        var ext1 = path.extname(imageName1)
        var newfilename1 = uniqid('_') + ext1;                 // change 
        var filepath1 = __dirname + "/../../uploads/process/" + newfilename1;


        var uploadImage2 = req.files.fileKey2;
        var imageName2 = uploadImage2.name;
        var ext2 = path.extname(imageName2)
        var newfilename2 = uniqid('_') + ext2;                 // change 
        var filepath2 = __dirname + "/../../uploads/process/" + newfilename2;

        var uploadImage3 = req.files.fileKey3;
        var imageName3 = uploadImage3.name;
        var ext3 = path.extname(imageName3)
        var newfilename3 = uniqid('_') + ext3;                 // change 
        var filepath3 = __dirname + "/../../uploads/process/" + newfilename3;

        var uploadImage4 = req.files.fileKey4;
        var imageName4 = uploadImage4.name;
        var ext4 = path.extname(imageName4)
        var newfilename4 = uniqid('_') + ext4;                 // change 
        var filepath4 = __dirname + "/../../uploads/process/" + newfilename4;



        return fileuploads(uploadImage1, filepath1).then(function (fileuploadsResult) {

            return fileuploads(uploadImage2, filepath2).then(function (fileuploadsResult1) {

                return fileuploads(uploadImage3, filepath3).then(function (fileuploadsResult2) {

                    return fileuploads(uploadImage4, filepath4).then(function (fileuploadsResult3) {

                        req.body.image1 = newfilename1;
                        req.body.image2 = newfilename2;
                        req.body.image3 = newfilename3;
                        req.body.image4 = newfilename4;

                        Operation.create(req.body).then(function (result) {
                            sendSuccess1(res, result);
                        }).catch(function (err) {
                            console.log(err);
                            sendError(res, err);
                        });

                        // PlanAbstract.findOne({ where: { drgId: req.body.drgId } }).then(function (resp) {

                        //     if (resp) {
                        //         Operation.create(req.body).then(function (result) {
                        //             sendSuccess1(res, result);
                        //         }).catch(function (err) {
                        //             console.log(err);
                        //             sendError(res, err);
                        //         });
                        //     }
                        //     else {

                        //         Drawing.findOne({ where: { id: req.body.drgId } }).then(function (dres) {

                        //             var newpfNo = '';

                        //             let code = dres.id;

                        //             var n = code.toString().length

                        //             if (n == 1) {
                        //                 newpfNo = "PP 000000" + code + "-10A"
                        //             }
                        //             else if (n == 2) {
                        //                 newpfNo = "PP 00000" + code + "-10A"
                        //             }
                        //             else if (n == 3) {
                        //                 newpfNo = "PP 0000" + code + "-10A"
                        //             }
                        //             else if (n == 4) {
                        //                 newpfNo = "PP 000" + code + "-10A"
                        //             }
                        //             else if (n == 5) {
                        //                 newpfNo = "PP 00" + code + "-10A"
                        //             }
                        //             else if (n == 6) {
                        //                 newpfNo = "PP 0" + code + "-10A"
                        //             }
                        //             else {
                        //                 newpfNo = "PP " + code + "-10A"
                        //             }


                        //             var mydata = {
                        //                 "drgId": req.body.drgId,
                        //                 "pfNo": newpfNo
                        //             }
                        //             PlanAbstract.create(mydata).then(function (paResult) {
                        //                 Operation.create(req.body).then(function (result) {
                        //                     sendSuccess(res, result);
                        //                 }).catch(function (err) {
                        //                     console.log(err);
                        //                     sendError(res, err);
                        //                 });
                        //             })


                        //         })


                        //     }

                        // })

                    })

                })
            })

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
                        }
                        );
                    }
                })
            }
            else {
                Drawing.update({ pfStatus: 1 }, { where: { id: req.params.id } }).then(result => {
                    var newpfNo = '';
                    let code = req.params.id;
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
                        "drgId": req.params.id,
                        "pfNo": newpfNo
                    }
                    PlanAbstract.create(mydata).then((planresult) => {
                        sendSuccess(res, planresult);
                    })
                }).catch(function (err) {
                    sendError(res, err);
                });
            }

        }).catch(function (err) {
            console.log("last err", err);
            sendError(res, err);
        });

        Drawing.update({pfStatus : 1}, { where: { id: req.params.id } }).then(result => {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, error);
        });


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


    var update1 = parseInt(req.body.upstatus1)
    var update2 = parseInt(req.body.upstatus2)
    var update3 = parseInt(req.body.upstatus3)
    var update4 = parseInt(req.body.upstatus4)

    var checkpath = "../uploads";
    if (!fs.existsSync(checkpath)) {
        fs.mkdirSync(checkpath);
    }
    checkpath = checkpath + '/process';
    if (!fs.existsSync(checkpath)) {
        fs.mkdirSync(checkpath);
    }

    if (req.files) {

        if (update1) {
            var uploadImage1 = req.files.fileKey1;
            var imageName1 = uploadImage1.name;
            var ext1 = path.extname(imageName1)
            var newfilename1 = uniqid('_') + ext1;                 // change 
            var filepath1 = __dirname + "/../../uploads/process/" + newfilename1;
            fileuploads(uploadImage1, filepath1).then(function (fileuploadsResult) {
                console.log("fileuploadsResult", fileuploadsResult)
            })

            var temp1 = Operation.update({ image1: newfilename1 }, { where: { id: req.params.id } });
        }


        if (update2) {
            var uploadImage2 = req.files.fileKey2;
            var imageName2 = uploadImage2.name;
            var ext2 = path.extname(imageName2)
            var newfilename2 = uniqid('_') + ext2;                 // change 
            var filepath2 = __dirname + "/../../uploads/process/" + newfilename2;
            fileuploads(uploadImage2, filepath2).then(function (fileuploadsResult2) {
                console.log("fileuploadsResult", fileuploadsResult2)
            })

            var temp2 = Operation.update({ image2: newfilename2 }, { where: { id: req.params.id } });
        }

        if (update3) {
            var uploadImage3 = req.files.fileKey3;
            var imageName3 = uploadImage3.name;
            var ext3 = path.extname(imageName3)
            var newfilename3 = uniqid('_') + ext3;                 // change 
            var filepath3 = __dirname + "/../../uploads/process/" + newfilename3;
            fileuploads(uploadImage3, filepath3).then(function (fileuploadsResult3) {
                console.log("fileuploadsResult", fileuploadsResult3)
            })

            var temp3 = Operation.update({ image3: newfilename3 }, { where: { id: req.params.id } });
        }

        if (update4) {
            var uploadImage4 = req.files.fileKey4;
            var imageName4 = uploadImage4.name;
            var ext4 = path.extname(imageName4)
            var newfilename4 = uniqid('_') + ext4;                 // change 
            var filepath4 = __dirname + "/../../uploads/process/" + newfilename4;
            fileuploads(uploadImage4, filepath4).then(function (fileuploadsResult4) {
                console.log("fileuploadsResult", fileuploadsResult4)
            })

            var temp4 = Operation.update({ image4: newfilename4 }, { where: { id: req.params.id } });
        }


        Operation.update(req.body, { where: { id: req.params.id } }).then(result => {
            sendSuccess1(res, result, "Data successfully updated");
        }).catch(function (err) {
            sendError(res, error);
        });


    }

    else {
        req.body.updatedBy = 1;
        return new Promise((resolve, reject) => {
            Operation.update(req.body, { where: { id: req.params.id } }).then(result => {
                sendSuccess1(res, result, "Data successfully updated");
            }).catch(function (err) {
                sendError(res, error);
            });
        })
    }


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
        var len = cards.length;


        cards.map(function (card, index) {

            var mytempData = {
                "drgId": req.body.drgid,
                "opnNo": card.opnNo,
                "opnName": card.opnName,
                "description": card.description,
                "workCenter": card.workCenter,
                "altProcess": false,
                "addKind": false
            }

            if (req.body.altProcess) {
                mytempData.altProcess = true;
            }

            if (req.body.addKind) {
                mytempData.addKind = true;
            }
            

            Operation.create(mytempData).then(function (cres) {
                sendSuccess1(res, cres);
            }).catch(function (err) {
                console.log(err);
                sendError(res, err);
            });
              


            //   if (index == (len - 1)) {


            //         PlanAbstract.findOne({ where: { drgId: req.body.drgid } }).then(function (resp1) {

            //             if (resp1) {
            //                 sendSuccess(res, resp1);
            //             }
            //             else {

            //                 if (req.body.altpro) {
            //                     sendSuccess(res, cres);
            //                 }

            //                 else if (req.body.addkind) {
            //                     sendSuccess(res, cres);
            //                 }

            //                 else {
            //                     Drawing.findOne({ where: { id: req.body.drgid } }).then(function (dres) {

            //                         var newpfNo = '';

            //                         // var newqpNo = '';


            //                         let code = dres.id;

            //                         var n = code.toString().length

            //                         if (n == 1) {
            //                             newpfNo = "PP 000000" + code + "-10A"

            //                             // newqpNo  = "QP 000000" + code + "-10AA"

            //                         }
            //                         else if (n == 2) {
            //                             newpfNo = "PP 00000" + code + "-10A"

            //                             // newqpNo = "QP 00000" + code + "-10AA"

            //                         }
            //                         else if (n == 3) {
            //                             newpfNo = "PP 0000" + code + "-10A"

            //                             // newqpNo = "QP 0000" + code + "-10AA"

            //                         }
            //                         else if (n == 4) {
            //                             newpfNo = "PP 000" + code + "-10A"

            //                             // newqpNo = "QP 000" + code + "-10AA"

            //                         }
            //                         else if (n == 5) {
            //                             newpfNo = "PP 00" + code + "-10A"

            //                             // newqpNo = "QP 00" + code + "-10AA"

            //                         }
            //                         else if (n == 6) {
            //                             newpfNo = "PP 0" + code + "-10A"

            //                             // newqpNo = "QP 0" + code + "-10AA"

            //                         }
            //                         else {
            //                             newpfNo = "PP " + code + "-10A"

            //                             // newqpNo = "QP " + code + "-10AA"

            //                         }


            //                         var mydata = {
            //                            "drgId": req.body.drgid,
            //                         //     //  "pfNo": newpfNo,
            //                         //     // "qpNo":newqpNo
            //                          }
            //                         PlanAbstract.create(mydata).then(function (paResult) {
            //                             sendSuccess(res, paResult);
            //                         }).catch(function (err) {
            //                             console.log(err);
            //                             sendError(res, err);
            //                         })


            //                     })

            //                 }

            //             }

            //         })




            //      }

            //  })



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