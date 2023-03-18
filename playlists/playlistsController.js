const db = require('../db/dbConfig')

class playlistsController {
    async get(req, res) {
        try {
            const playlist = await db.select("*").from("playlists")
            console.log(playlist)
            return res.status(200).json(playlist)
        }
        catch(e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            const name = req.body
            console.log(name)
            await db("playlists").insert(name)
            return res.status(200).json(name)
        }
        catch(e) {
            console.log(e)
        }
    }
}

module.exports = new playlistsController()