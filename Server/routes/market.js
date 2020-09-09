const express = require('express')
const router = express.Router()

const { Drawing, MarketPurchase,MarketCard, Operation } = require('./../models')


function sendError(res, err) {
    var result = {
        "success": false,
        "error": err,
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

        MarketPurchase.findAll().then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/card/:mpId', (req, res) => {
    return new Promise((resolve, reject) => {

        MarketCard.findAll({where:{mpId:req.params.mpId}}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/view/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {
        Operation.findAll({ where: { drgId: req.params.drgId,deleteStatus: false}, order:[['opnNo', 'ASC']]}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/header/:drgId', (req, res) => {
    return new Promise((resolve, reject) => {

        Drawing.findOne({ where: { id: req.params.drgId}}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            console.log(err)
            sendError(res, err);
        });
    })
})


router.get('/rqty/:mpId', (req, res) => {
    return new Promise((resolve, reject) => {

        MarketPurchase.findOne({ where: { id: req.params.mpId}}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            console.log(err)
            sendError(res, err);
        });
    })
})

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {

        Drawing.findOne({ where: { id: req.body.drgId } }).then(function (dresult) {

            if (dresult) {

                MarketPurchase.findOne({ where: { poNo: req.body.poNo, drgId: req.body.drgId } }).then(function (mresult) {
                    if (mresult) {
                        sendError(res, "Order Already there !!");
                    }
                    else {
                        req.body.remainingQty = req.body.orderQty;

                        MarketPurchase.create(req.body).then(function (result) {
                            sendSuccess(res, result);
                        })
                    }
                })
            }
            else {
                sendError(res, "Worng Drawing Code");
            }
        })



    })
})

router.post('/card', (req, res) => {
    return new Promise((resolve, reject) => {

        MarketPurchase.findOne({ where: { id: req.body.mpId } }).then(function (mresult) {


            if (mresult.remainingQty >= req.body.qty) {
                let remainingQty = mresult.remainingQty - req.body.qty;
                MarketPurchase.update({ remainingQty: remainingQty }, { where: { id: mresult.id } }).then(function (updateRes) {

                    MarketCard.count({where:{mpId:req.body.mpId}}).then(function(countres){

                        let a = countres+1;
                        let temp = 'D'+req.body.drgId+'/'+new Date().getFullYear().toString().substr(-2)+'/'+(new Date().getMonth()+1).toString()+'-'+a;
                        req.body.cardNo = temp;
                        req.body.rQty = remainingQty;
                        MarketCard.create(req.body).then(function (result) {
                            sendSuccess(res, result)
                        })
                    })
                })
            }
            else {
                sendError(res, "Order Quantity Exceed");
            }




        })




    })
})

// router.post('/', (req, res) => {
//     return new Promise((resolve, reject) => {

//         console.log("my data \n \n",req.body);


//         Drawing.findOne({where:{id: req.body.drgId}}).then(function(dresult){

//             if(dresult){
//                 Market.findAndCountAll({where:{poNo : req.body.poNo , drgId :req.body.drgId},order: [['id', 'ASC']],}).then(function (mresult){

//                     if(mresult){

//                         console.log("res",mresult)
//                         Market.create(req.body).then(function (result) {
//                             let a =  mresult.rows[0].id+'/'+ (mresult.count + 1)
//                             var tem = {"rcNo" : a}
//                             Market.update(tem,{ where: { id: result.id } }).then(function (mresult){
//                                 sendSuccess(res, result);
//                             })
//                         }).catch(function (err) {

//                             console.log(err);
//                             sendError(res, err);
//                         });

//                     }
//                     else{
//                         Market.create(req.body).then(function (result) {
//                             let a =  result.id+'/1'
//                             var tem = {"rcNo" : a}
//                             Market.update(tem,{ where: { id: result.id } }).then(function (mresult){
//                                 sendSuccess(res, result);
//                             })
//                         }).catch(function (err) {
//                             sendError(res, err);
//                         });
//                     }


//                 })   

//             }
//             else{
//                 sendError(res, "Wrong");
//             }



//         })



//     })
// })



module.exports = router