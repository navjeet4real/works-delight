const router = require('express').Router();
const authRoute = require('./authRoutes');
const appRoute = require('./appRoutes');


router.use('/auth', authRoute)
router.use('/app', appRoute)



module.exports = router;