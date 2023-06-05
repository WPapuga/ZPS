const express = require('express')
const path = require('path')

const app = express();
app.use(express.static('publicFiles'));

app.get('/', (req, res) => {
    var page = `<head>
                <style>
                    table, th, td {border: 1px solid;}
                    button {margin-bottom: 20px}
                    .removeRowButton {margin-bottom: 0px}
                </style>
                </head>
                <body>
                    <h1>Hello World Player!</h1>`;
    if(req.query.videoFile != undefined){
            page += `<video id="videoPlayer" controls>
                        <source src="${req.query.videoFile}" type="video/mp4">
                        przeglądarka nie obsługuje video
                    </video>`
            page += `<br> <button id="videoCancel" type="button" onclick="cancelVideo()">Anuluj video</button>`;
            page += `     <button id="videoAdd" type="button" onclick="addVideo()">Add video</button>`
            page += `     <button id="videoPlay" type="button" onclick="document.getElementById('videoPlayer').play()">Play Video</button>`
            page += `     <button id="videoPause" type="button" onclick="document.getElementById('videoPlayer').pause()">Pause Video</button> <br>`
    }
    if(req.query.audioFile != undefined){
            page += `<audio id="audioPlayer" controls>
                        <source src="${req.query.audioFile}" type="audio/mpeg">
                        przeglądarka nie obsługuje audio
                    </audio>`;
            page += `<br> <button id="audioCancel" type="button" onclick="cancelAudio()">Anuluj audio</button>`;
            page += `     <button id="audioAdd" type="button" onclick="addAudio()">Add audio</button>`
            page += `     <button id="audioPlay" type="button" onclick="document.getElementById('audioPlayer').play()">Play Audio</button>`
            page += `     <button id="audioPause" type="button" onclick="document.getElementById('audioPlayer').pause()">Pause Audio</button> <br>`
    }
    if(req.query.imgFile != undefined){
            page += `<img id="posterImage" src="${req.query.imgFile}" alt="Poster Image">`;
            page += `<br> <button id="imgAdd" type="button" onclick="addImage()">Add image</button> <br>`
    }
    page += `<table id="playlist_table">
                <tr>
                    <th>No.</th>
                    <th>URL</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
             </table>`;
    page += `<script>
                var id = 1;
                var table = document.getElementById("playlist_table")
                var header = table .rows[0];

                function cancelVideo() {
                    const video = document.getElementById('videoPlayer');
                    if (video) {
                        video.children[0].src = "cancel.mp4";
                        video.src = 'cancel.mp4';
                    }
                }
                function cancelAudio() {
                    const audio = document.getElementById('audioPlayer');
                    if (audio) {
                        audio.children[0].src = "cancel.mp3";
                        audio.src = 'cancel.mp3';
                    }
                }
                function addVideo() {
                    const table = document.getElementById('playlist_table');
                    const video = document.getElementById('videoPlayer');
                    var row = table.insertRow();
                    row.insertCell(0).innerHTML = id;
                    id = id + 1;
                    row.insertCell(1).innerHTML = video.children[0].src;
                    row.insertCell(2).innerHTML = "Video";
                    var button = document.createElement('button');
                    button.className = "removeRowButton";
                    button.innerText = "Delete";
                    button.addEventListener("click", function(){
                        this.parentNode.parentNode.parentNode.remove()
                    })
                    var buttonUp = document.createElement('button');
                    buttonUp.className = "moveRowUpButton";
                    buttonUp.innerText = "Up";
                    buttonUp.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != 1) {
                            row.parentNode.insertBefore(row, row.previousSibling)
                        } else {
                            table.tBodies[0].appendChild(row)
                        }
                    })
                    var buttonDown = document.createElement('button');
                    buttonDown.className = "moveRowDownButton";
                    buttonDown.innerText = "Down";
                    buttonDown.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != row.parentNode.rows.length - 1) {
                            row.parentNode.insertBefore(row.nextSibling, row)
                        }  else {
                            row.parentNode.insertBefore(row, header.nextSibling)
                            this.dispatchEvent(new Event("click"))
                        }
                    })

                    var lastCell = document.createElement('div')
                    lastCell.append(button)
                    lastCell.append(buttonUp)
                    lastCell.append(buttonDown)
                    row.insertCell(3).append(lastCell);
                }
                function addAudio() {
                    const table = document.getElementById('playlist_table');
                    const audio = document.getElementById('audioPlayer');
                    var row = table.insertRow();
                    row.insertCell(0).innerHTML = id;
                    id = id + 1;
                    row.insertCell(1).innerHTML = audio.children[0].src;
                    row.insertCell(2).innerHTML = "Audio";
                    var button = document.createElement('button');
                    button.className = "removeRowButton";
                    button.innerText = "Delete";
                    button.addEventListener("click", function(){
                        this.parentNode.parentNode.parentNode.remove()
                    })
                    var buttonUp = document.createElement('button');
                    buttonUp.className = "moveRowUpButton";
                    buttonUp.innerText = "Up";
                    buttonUp.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != 1) {
                            row.parentNode.insertBefore(row, row.previousSibling)
                        } else {
                            table.tBodies[0].appendChild(row)
                        }
                    })
                    var buttonDown = document.createElement('button');
                    buttonDown.className = "moveRowDownButton";
                    buttonDown.innerText = "Down";
                    buttonDown.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != row.parentNode.rows.length - 1) {
                            row.parentNode.insertBefore(row.nextSibling, row)
                        } else {
                            row.parentNode.insertBefore(row, header.nextSibling)
                            this.dispatchEvent(new Event("click"))
                        }
                    })

                    var lastCell = document.createElement('div')
                    lastCell.append(button)
                    lastCell.append(buttonUp)
                    lastCell.append(buttonDown)
                    row.insertCell(3).append(lastCell);
                }
                function addImage() {
                    const table = document.getElementById('playlist_table');
                    const image = document.getElementById('posterImage');
                    var row = table.insertRow();
                    row.insertCell(0).innerHTML = id;
                    id = id + 1;
                    row.insertCell(1).innerHTML = image.src;
                    row.insertCell(2).innerHTML = "Image";
                    var button = document.createElement('button');
                    button.className = "removeRowButton";
                    button.innerText = "Delete";
                    button.addEventListener("click", function(){
                        this.parentNode.parentNode.parentNode.remove()
                    })
                    var buttonUp = document.createElement('button');
                    buttonUp.className = "moveRowUpButton";
                    buttonUp.innerText = "Up";
                    buttonUp.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != 1) {
                            row.parentNode.insertBefore(row, row.previousSibling)
                        } else {
                            table.tBodies[0].appendChild(row)
                            this.dispatchEvent(new Event("click"))
                        }
                    })
                    var buttonDown = document.createElement('button');
                    buttonDown.className = "moveRowDownButton";
                    buttonDown.innerText = "Down";
                    buttonDown.addEventListener("click", function(){
                        var row = this.parentNode.parentNode.parentNode
                        if (row.rowIndex != row.parentNode.rows.length - 1) {
                            row.parentNode.insertBefore(row.nextSibling, row)
                        } else {
                            row.parentNode.insertBefore(row, header.nextSibling)
                        }
                    })
                    
                    var lastCell = document.createElement('div')
                    lastCell.appendChild(button)
                    lastCell.appendChild(buttonUp)
                    lastCell.appendChild(buttonDown)
                    row.insertCell(3).appendChild(lastCell);
                }
            </script>`
    page += `</body>`;
    res.send(page);
})


app.listen(4080)