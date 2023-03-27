const express = require('express')
const path = require('path')

const app = express();
app.use(express.static('publicFiles'));

app.get('/', (req, res) => {
    var page = `<body>
                    <h1>Hello World Player!</h1>`;
    if(req.query.videoFile != undefined){
        if(path.extname(req.query.videoFile) == '.mp4'){
            page += `<video id="videoPlayer" controls>
                        <source src="${req.query.videoFile}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>`
        }
    }
    if(req.query.audioFile != undefined){
        if(path.extname(req.query.audioFile) == '.mp3'){
            page += `<audio id="audioPlayer" controls>
                        <source src="${req.query.audioFile}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>`;
        }
    }
    var page = `</body>`;
    res.send(page);
})


app.listen(4080)
