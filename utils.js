const fs = require("fs");
const path = require("path");

const getFilesFromDirectory = (directoryPath, count = 0) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      const fileList = files.map((file) => ({
        name: file,
        path: path.join(directoryPath, file),
        type: fs.lstatSync(path.join(directoryPath, file)).isDirectory()
          ? "directory"
          : "file",
      }));

      if (count > 0) {
        resolve(fileList.slice(0, count));
      } else {
        resolve(fileList);
      }
    });
  });
};

function trimFromDot(str) {
  const dotIndex = str.indexOf(".");
  if (dotIndex !== -1) {
    return str.substring(0, dotIndex);
  }
  return str; // Return the original string if no dot is found
}

module.exports = { getFilesFromDirectory, trimFromDot };
