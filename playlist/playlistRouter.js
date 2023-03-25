const Router = require('express')
const controller = require('./playlistController')

const router = new Router 

router.get('/get/:playlist_id', controller.get)
router.post('/create/:playlist_id', controller.create)
router.delete('/delete/:playlist_id', controller.delete)

module.exports = router