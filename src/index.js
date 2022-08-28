const { ipcRenderer } = require('electron');
var uploadFile = document.getElementById('upload');
var aboutclick = document.getElementById('about');
aboutclick.addEventListener('click', () => {
  alert("App: Pav-K Video Player\nA video player made by Pavan using ElectronJs.\nVersion: 1.0.0")
});
var gitclick = document.getElementById('github');
gitclick.addEventListener('click', () => {
  alert("Visit https://pavkcode.bitbucket.io")

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
