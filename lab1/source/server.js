const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.send(`<body>
                <h1>Hello World Player!</h1>
                <h2>Nie podałeś żadnego pliku w urlu</h2>
              </body>`);
})

app.get('/:file', (req, res) => {
    const fileExt = path.extname(req.params.file);
    if(fileExt == '.mp4'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <video controls>
                        <source src="${req.params.file}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>
                 </body>`);
    }
    else if(fileExt == '.mp3'){
        res.send(`<body>
                    <h1>Hello World Player!</h1>
                    <audio controls>
                        <source src="${req.params.file}" type="audio/mpeg">
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
