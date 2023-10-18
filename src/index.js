const { ipcRenderer } = require('electron');
var uploadFile = document.getElementById('upload');
var aboutclick = document.getElementById('about');
aboutclick.addEventListener('click', () => {
  alert("App: Video Player\nVersion: 1.0.0")
});
var gitclick = document.getElementById('github');
gitclick.addEventListener('click', () => {
  alert("Visit https://github.com/")

});
uploadFile.addEventListener('click', () => {
  ipcRenderer.send('file-request');
});

ipcRenderer.on('file', (event, file) => {
  console.log('obtained file from main process: ' + file);
  video = document.getElementById('player')
  source = document.getElementById('source')
  source.setAttribute('src', file)
  video.load()
        
});
