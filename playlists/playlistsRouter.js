const Router = require('express')
const controller = require('./playlistsController')

const router = new Router 

router.get('/get', controller.get)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)

module.exports = router