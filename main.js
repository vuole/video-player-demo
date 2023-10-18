const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const { dialog } = require('electron')
const path = require('path')
function createWindow() {
    const win = new BrowserWindow({
        height:510,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },

        icon: __dirname + '/video.png',
        title: 'Video Player',
    });
    win.setTitle('Video Player');
    win.loadFile(path.join(__dirname, 'src', 'index.html'));
    win.setMenuBarVisibility(false)
}
ipcMain.on('file-request', (event) => {
        dialog.showOpenDialog({
            title: 'Select the Video',
            buttonLabel: 'Open',
            filters: [
                {
                    name: 'Videos',
                    extensions: ['mp4', 'mkv','ts']
                }, {
                    name: 'All Files',
                    extensions: ['*']
                }],
            properties: ['openFile','dontAddToRecent','showHiddenFiles']
        }).then(file => {
            const filepath = file.filePaths[0].toString();
            event.reply('file', filepath);

        }).catch(err => {
            console.log(err)
        });
    
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});