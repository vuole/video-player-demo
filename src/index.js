const { ipcRenderer } = require("electron");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs');
ffmpeg.setFfmpegPath(ffmpegPath);

var uploadFile = document.getElementById("upload");
var aboutclick = document.getElementById("about");

const streamKey = "FB-283071161424650-0-Abx0XVQlF3vxF_1P";

// RTMP URL từ Facebook Live (bao gồm Stream Key)
const rtmpUrl = `rtmps://live-api-s.facebook.com:443/rtmp/${streamKey}`;

// Đường dẫn đến tệp video trong hệ thống
const videoFilePath = "./videoTest.mp4";

// Khởi tạo đối tượng ffmpeg
const command = ffmpeg();

// Đọc tệp video đầu vào
command.input(fs.createReadStream(videoFilePath));

// Thiết lập đầu ra RTMP
command.output(rtmpUrl);

// Bắt đầu phát video
command.run();

// Xử lý sự kiện khi quá trình phát video bắt đầu
command.on("start", () => {
  console.log("Bắt đầu phát video");
  alert("Bắt đầu phát video");
});

// Xử lý sự kiện khi quá trình phát video kết thúc
command.on("end", () => {
  console.log("Kết thúc phát video");
  alert("Kết thúc phát video");
});

// Xử lý lỗi nếu có
command.on("error", (err) => {
  console.error("Lỗi phát video:", err);
  alert("Lỗi phát video:", err);
});


aboutclick.addEventListener("click", () => {
  // alert("App: Video Player\nVersion: 1.0.0 abc");
  // Stream Key từ Facebook Live
// const streamKey = "FB-283037708094662-0-AbwlhS9m-VbhCiXi";

// // RTMP URL từ Facebook Live (bao gồm Stream Key)
// const rtmpUrl = `rtmps://live-api-s.facebook.com:443/rtmp/${streamKey}`;

// // Đường dẫn đến tệp video trong hệ thống
// const videoFilePath = "C:\Users\Admin\Downloads\videoTest.mp4";

// // Khởi tạo đối tượng ffmpeg
// const command = ffmpeg();

// // Đọc tệp video đầu vào
// command.input(videoFilePath);

// // Thiết lập đầu ra RTMP
// command.output(rtmpUrl);

// // Bắt đầu phát video
// command.run();

// // Xử lý sự kiện khi quá trình phát video bắt đầu
// command.on("start", () => {
//   console.log("Bắt đầu phát video");
//   alert("Bắt đầu phát video");
// });

// // Xử lý sự kiện khi quá trình phát video kết thúc
// command.on("end", () => {
//   console.log("Kết thúc phát video");
//   alert("Kết thúc phát video");
// });

// // Xử lý lỗi nếu có
// command.on("error", (err) => {
//   console.error("Lỗi phát video:", err);
//   alert("Lỗi phát video:", err);
// });
});

var gitclick = document.getElementById("github");
gitclick.addEventListener("click", () => {
  alert("Visit https://github.com/");
});
uploadFile.addEventListener("click", () => {
  ipcRenderer.send("file-request");
});

ipcRenderer.on("file", (event, file) => {
  console.log("obtained file from main process: " + file);
  video = document.getElementById("player");
  source = document.getElementById("source");
  source.setAttribute("src", file);
  video.load();
});
