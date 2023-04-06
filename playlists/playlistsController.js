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
            const playlist = await db.select("*").from("playlists")
            console.log(playlist)
            for (let i = 0; i < playlist.length; i++) {
                if (playlist[i].name == name.name) {
                    return res.status(400).json({message: "Такого плейлист уже существует"})
                }
            }
            await db("playlists").insert(name)
            return res.status(200).json(name.name)
        }
        catch(e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            console.log(id)
            //const playlist = await db.select("*").from("playlists")
            await db("playlists").where("id", id).del()
            return res.status(200).json({message: "Плейлист удален"})
        }
        catch(e) {
            console.log(e)
        }
    }
}

module.exports = new playlistsController()