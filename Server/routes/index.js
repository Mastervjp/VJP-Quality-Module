var express = require('express')
const router = express.Router()
const authCheckMiddleware = require('./../middleware/auth')

router.use('/master', require('./master'))

router.use('/auth', require('./user'))
router.use('/drawing', require('./drawing'))
router.use('/operation', require('./operation'))
router.use('/process', require('./process'))
router.use('/inspection',authCheckMiddleware, require('./inspection'))
router.use('/admin', require('./admin'))
router.use('/quality',authCheckMiddleware, require('./qualityplan'))
router.use('/sample',authCheckMiddleware, require('./samplemaster'))
router.use('/market',authCheckMiddleware, require('./market'))
router.use('/contractreview',authCheckMiddleware, require('./contractreview'))




// router.use('/user', authCheckMiddleware, require('./user'))

 
module.exports = router;
