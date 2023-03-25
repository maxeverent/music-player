const db = require('../db/dbConfig')

class playlistController {
    async get(req, res) {
        try {
            const {playlist_id} = req.params
            const playlist = await db.select("track_id").from("playlist").where("playlist_id", "=", playlist_id)
            const response = []
            for(let i = 0; i < playlist.length; i++) {
                response.push(playlist[i].track_id)
            }
            return res.status(200).json(response)
        }
        catch(e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            const {playlist_id} = req.params
            const track = req.body
            const tracks = await db.select("*").from("playlist") 
            const playlist = {
                track_id: track.track_id,
                playlist_id: playlist_id
            }
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].track_id == playlist.track_id && tracks[i].playlist_id == playlist.playlist_id) {
                    return res.status(400).json({message: "Такой трек в данном плейлисте уже существует"})
                }
            }
            await db("playlist").insert(playlist)
            return res.status(200).json(playlist)
        }
        catch(e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const {playlist_id} = req.params
            const track = req.body
            await db("playlist").where("playlist_id", "=", playlist_id).andWhere("track_id", "=", track.track_id).del()
            return res.status(200).json({message: "Трек удален"})
        }
        catch(e) {
            console.log(e)
        }
    }
}

module.exports = new playlistController()