const fs = require("fs");
const path = require("path");
const { getFilesFromDirectory, trimFromDot } = require("./utils");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const mediaDirectory = path.join(__dirname, "./media");

function generateAllThumbnails() {
  fs.readdir(mediaDirectory, async (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }

    const folderList = files.map((file) => ({
      name: file,
      path: path.join(mediaDirectory, file),
      type: fs.lstatSync(path.join(mediaDirectory, file)).isDirectory()
        ? "directory"
        : "file",
    }));

    for (let i = 0; i < folderList.length; i++) {
      const directory = folderList[i].name;
      const directoryPath = path.join(mediaDirectory, directory);
      const videoFiles = await getFilesFromDirectory(directoryPath);
      for (let j = 0; j < videoFiles.length; j++) {
        const videoPath = videoFiles[j].path;
        const imageTitle = trimFromDot(videoFiles[j].name);
        await ffmpeg(videoPath).takeScreenshots(
          {
            count: 1,
            timemarks: ["5"], // number of seconds
            filename: `${imageTitle}.jpg`,
          },
          `./thumbnails/`,
          function (err) {
            console.log("screenshots were saved");
          }
        );
      }
    }
  });
}

generateAllThumbnails()
