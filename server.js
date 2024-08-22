const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { getFilesFromDirectory } = require("./utils");

const app = express();
app.use(cors());

const mediaDirectory = path.join(__dirname, "./media");

app.use("/thumb", express.static(path.join(__dirname, "thumbnails")));

app.get("/video/:folder/:filename", (req, res) => {
  const videoPath = path.join(
    mediaDirectory,
    req.params.folder,
    req.params.filename
  );
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.get("/api/files", (req, res) => {
  fs.readdir(mediaDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }

    const fileList = files.map((file) => ({
      name: file,
      path: path.join(mediaDirectory, file),
      type: fs.lstatSync(path.join(mediaDirectory, file)).isDirectory()
        ? "directory"
        : "file",
    }));

    res.json(fileList);
  });
});

app.get("/api/files/:directory", async (req, res) => {
  const { directory } = req.params;
  const directoryPath = path.join(mediaDirectory, directory);

  try {
    const files = await getFilesFromDirectory(directoryPath);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: `Failed to read directory: ${directory}` });
  }
});

app.get("/api/homefiles", (req, res) => {
  fs.readdir(mediaDirectory, async (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }

    const fileList = files.map((file) => ({
      name: file,
      path: path.join(mediaDirectory, file),
      type: fs.lstatSync(path.join(mediaDirectory, file)).isDirectory()
        ? "directory"
        : "file",
    }));

    const homefiles = await Promise.all(
      fileList.map(async (file) => {
        const videos = await getFilesFromDirectory(file.path, 5);
        return {
          ...file,
          videos
        };
      })
    );

    res.json(homefiles);
  });
});

const PORT = process.env.PORT || 3001;
console.log(mediaDirectory);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
