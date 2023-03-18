const db = require('../db/dbConfig')

class playlistController {
    async get(req, res) {
        try {
            const playlist = await db.select("track_id").from("playlist").where("playlist_id", "=", 1)
            const tracks = await db.select("*").from("music")
            console.log(playlist)
            console.log(tracks)
            const response = []
            for(let i = 0; i < playlist.length; i++) {
                for(let j = 0; j < tracks.length; j++) {
                    if (playlist[i].track_id == tracks[j].id) {
                        response.push(tracks[j])
                    }
                }
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
            const playlist = {
                track_id: track.track_id,
                playlist_id: playlist_id
            }
            await db("playlist").insert(playlist)
            return res.status(200).json(playlist)
        }
        catch(e) {
            console.log(e)
        }
    }
}

module.exports = new playlistController()