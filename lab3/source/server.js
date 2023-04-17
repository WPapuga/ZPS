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
            page += `<button id="videoCancel" type="button" onclick="cancelVideo()">Anuluj video</button> <br>`;
        }
    }
    if(req.query.audioFile != undefined){
        if(path.extname(req.query.audioFile) == '.mp3'){
            page += `<audio id="audioPlayer" controls>
                        <source src="${req.query.audioFile}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>`;
            page += `<button id="audioCancel" type="button" onclick="cancelAudio()">Anuluj audio</button> <br>`;
        }
    }
    const imgExts = [".jpg", ".jpeg", ".png", ".gif"];
    if(req.query.imgFile != undefined){
        if(imgExts.includes(path.extname(req.query.imgFile).toLocaleLowerCase())){
            page += `<img id="posterImage" src="${req.query.imgFile}" alt="Poster Image">`;
        }
    }
    page += `<table id="playlist_table">
                <tr>
                    <th>No.</th>
                    <th>URL</th>
                    <th>Type</th>
                </tr>
             </table>`;
    page += `<script>
                function cancelVideo() {
                    const video = document.getElementById('videoPlayer');
                    if (video) {
                        video.src = 'cancel.mp4';
                    }
                }
                function cancelAudio() {
                    const audio = document.getElementById('audioPlayer');
                    if (audio) {
                        audio.src = 'cancel.mp3';
                    }
                }  
            </script>`
    page += `</body>`;
    res.send(page);
})


app.listen(4080)
