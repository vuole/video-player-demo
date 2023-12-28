const { ipcRenderer } = require("electron");
// const GL = require("gl");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
// import { PassThrough } from "stream";
// import GL from "gl";
// const { PassThrough } = require("stream");
ffmpeg.setFfmpegPath(ffmpegPath);

var uploadFile = document.getElementById("upload");
var aboutclick = document.getElementById("about");

const streamKey = "FB-283596588038774-0-AbyTPWfrXoACdXqM";
const rtmpUrl = `rtmps://live-api-s.facebook.com:443/rtmp/${streamKey}`;
const videoFilePath = "./videoTest2.mp4";

// const WIDTH = 1920;
// const HEIGHT = 1080;
// const gl = GL(WIDTH, HEIGHT);

// const glBuf = new PassThrough();
// const render = () => {
//   // gl.viewport(0, 0, WIDTH, HEIGHT);
//   // gl.clearColor(0, 0, 0, 1);
//   // gl.clear(gl.COLOR_BUFFER_BIT);

//   const pixels = new Uint8Array(WIDTH * HEIGHT * 4);
//   // gl.readPixels(0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
//   glBuf.write(pixels);
// };

// const FRAMES = 10;
// setInterval(() => {
//   for (let i = 0; i < FRAMES; i++) {
//     render();
//   }
// }, FRAMES * 1.1 * (1000 / 60));

ffmpeg(fs.createReadStream(videoFilePath))
  // .input(glBuf)
  // .inputFormat("rawvideo")
  // .inputOptions([`-video_size ${WIDTH}x${HEIGHT}`, "-pix_fmt rgba"])
  // .inputFPS(60)
  // .inputFormat("flv")
  // .videoCodec("mpeg4")
  // .videoCodec('libx264')
  // .audioCodec('libmp3lame')
  // .size('320x240')
  .outputFormat("flv")
  .outputOptions([
    "-c:v libx264",
    "-preset slower",
    "-maxrate 3000k",
    "-bufsize 6000k",
    // "-pix_fmt yuv420p",
    // "-g 60",
    "-c:a aac",
    // "-b:a 160k",
    // "-ac 2",
  ])
  .output(rtmpUrl)
  .on("start", () => {
    console.log("Bắt đầu");
  })
  .on("end", () => {
    console.log("Phân phối video thành công");
  })
  .on("error", (err) => {
    console.error("Lỗi trong quá trình phân phối video:", err);
  })
  .run();

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
