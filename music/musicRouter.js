const Router = require('express')
const controller = require('./musicController')

const router = new Router 

router.get('/get', controller.get)
router.get('/:id', controller.track)

module.exports = router