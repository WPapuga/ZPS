const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.send(`<body>
                <h1>Hello World Player!</h1>
                <h2>Nie podałeś żadnego pliku w urlu</h2>
              </body>`);
})


app.listen(4080)
