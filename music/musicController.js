const db = require('../db/dbConfig')

class musicController {
    async get(req, res) {
        try {
            const track = await db.select("*").from("music")
            console.log(track)
            return res.status(200).json(track)
        }
        catch(e) {
            console.log(e)
        }
    }

    async track(req, res) {
        try {
            const {id} = req.params
            console.log(id)
            const track = await db.select("*").from("music").where("id", "=", id)
            console.log(track)
            return res.status(200).json(track)
        }
        catch(e) {
            console.log(e)
        }
    }
}
module.exports = new musicController()