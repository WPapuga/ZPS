const express = require('express')
const path = require('path')

const app = express();
app.use(express.static('publicFiles'));

app.get('/', (req, res) => {
    res.send(`<body>
                <h1>Hello World Player!</h1>
                <h2>Nie podałeś żadnego pliku w urlu</h2>
              </body>`);
})

app.get('/:file', (req, res) => {
    const fileExt = path.extname(req.params.file);
    const filePath = './' + req.params.file;
    if(fileExt == '.mp4'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <video id="videoPlayer" controls>
                        <source src="${filePath}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>
                 </body>`);
    }
    else if(fileExt == '.mp3'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <audio id="audioPlayer" controls>
                        <source src="${filePath}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>
                  </body>`);       
                }
    else{
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <h2>Podales zle pliki</h2>
                  </body>`);
    }           
})

app.get('/:file1/:file2', (req, res) => {
    const file1Ext = path.extname(req.params.file1);
    const file2Ext = path.extname(req.params.file2);
    if(file1Ext == '.mp4'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <video id="videoPlayer" controls>
                        <source src="${'./' + req.params.file1}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>
                    <audio id="audioPlayer" controls>
                        <source src="${'./' + req.params.file2}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>
                 </body>`);
    }
    else if(file1Ext == '.mp3'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <video id="videoPlayer" controls>
                        <source src="${'./' + req.params.file2}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>
                    <audio id="audioPlayer" controls>
                        <source src="${'./' + req.params.file1}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>
                  </body>`);       
                }
    else{
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <h2>Podales zle pliki</h2>
                  </body>`);
    }           
})


app.listen(4080)
