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

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

app.use(bp.json())

app.use('/music', musicRouter)
app.use('/music/file/:id', async (req, res) => {
    try {
        const {id} = req.params
        const track = await db.select("*").from("music").where("id", "=", id)
        //res.sendFile(__dirname + track[0].path)
        const musicPath = __dirname + track[0].path
        

        const range = req.headers.range; 
        const stat = fs.statSync(musicPath); 

        let start = 0;
        let end = stat.size - 1;
        const CHUNK_SIZE = 10 ** 6; 

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            start = parseInt(parts[0], 10);
            end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        }

        const contentLength = end - start + 1; 

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'audio/mpeg'
        };

        res.writeHead(206, headers); 

        const stream = fs.createReadStream(musicPath, { start, end });
        stream.on('data', (chunk) => {
            res.write(chunk);
        });
        stream.on('end', () => {
            res.end();
        });
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
