const fs = require("fs");

function readJsonFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err); // -> to .catch
      else resolve(JSON.parse(data.toString())); // -> to .then
    });
  });
}

function writeJsonFile(path, jsonObj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(jsonObj, null, 2), (err) => {
      if (err) reject(err); // -> to .catch
      else resolve(jsonObj); // -> to .then
    });
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};