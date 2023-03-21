const db = require('./db/dbConfig')
const cors = require('cors');
const bp = require('body-parser')
const fs = require('fs');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const musicRouter = require('./music/musicRouter')
const playlistsRouter = require('./playlists/playlistsRouter')
const playlistRouter = require('./playlist/playlistRouter')

app.use(cors());
app.use(bp.json())

app.use('/music', musicRouter)
app.use('/music/file/:id', async (req, res) => {
    try {
        const {id} = req.params
        const track = await db.select("*").from("music").where("id", "=", id)
        res.sendFile(__dirname + track[0].path)
    }
    catch(e) {
        console.log(e)
    }
})
app.use('/playlists', playlistsRouter)
app.use('/playlist', playlistRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
