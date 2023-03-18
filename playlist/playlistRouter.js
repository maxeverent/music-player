const Router = require('express')
const controller = require('./playlistController')

const router = new Router 

router.get('/get', controller.get)
router.post('/create/:playlist_id', controller.create)

module.exports = router