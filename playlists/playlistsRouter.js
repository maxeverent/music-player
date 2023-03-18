const Router = require('express')
const controller = require('./playlistsController')

const router = new Router 

router.get('/get', controller.get)
router.post('/create', controller.create)

module.exports = router