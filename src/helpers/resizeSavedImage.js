import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import request from "request";
import sharp from "sharp";

const saveAndResizeImage = async (url, res, req) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const inputFilePath = path.resolve(__dirname, "../images/input.jpg");
  const file = fs.createWriteStream(inputFilePath);
  const outputFilePath = path.resolve(__dirname, "../images/output.jpg");

  return await new Promise((resolve, reject) => {
    try {
      request({
        uri: url,
        gzip: true,
      })
        .on("error", (error) => {
          resolve({
            status: 500,
            error: error,
          });
        })
        .pipe(file)
        .on("error", (error) => {
          resolve({
            status: 500,
            error: error,
          });
        })
        .on("finish", async () => {
          sharp(inputFilePath)
            .resize({
              height: 50,
              width: 50,
            })
            .toFile(outputFilePath)
            .then(() => {
              resolve({
                status: 200,
                outputFilePath,
              });
            })
            .catch((error) => {
              resolve({
                status: 500,
                error: error,
              });
            });
        });
    } catch (error) {
      resolve({
        status: 500,
        error: error,
      });
    }
  }).then((value) => {
    return value;
  });
};

export default saveAndResizeImage;
