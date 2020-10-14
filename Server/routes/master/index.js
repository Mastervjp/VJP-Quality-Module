var express = require('express')
const router = express.Router()
const authCheckMiddleware = require('./../../middleware/auth')

router.use('/workcenter', require('./workcenter'))
router.use('/machine', require('./machining'))

router.use('/drawing', require('./drawingtype'))
router.use('/instrument', require('./instrument'))
router.use('/operation', require('./operationlist'))
router.use('/measuring', require('./measuringfrequency'))
router.use('/material', require('./material'))

router.use('/castingtol', require('./castingtolerance'))
router.use('/heat', require('./heattreatment'))
router.use('/machinetol', require('./machiningtolerance'))
router.use('/specialpro', require('./specialprocess'))


router.use('/incomingsource', require('./incomingsource'))
router.use('/processcharacteristics', require('./processcharacteristics'))
router.use('/productcharacteristics', require('./productcharacteristics'))
router.use('/processlist', require('./processlist'))
// router.use('/track',authCheckMiddleware, require('./track'))

 
module.exports = router;
