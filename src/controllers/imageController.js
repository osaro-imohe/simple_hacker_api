import { checkValidUrl } from "../helpers/index.js";
import saveAndResizeImage from "../helpers/resizeSavedImage.js";

export const resizeImage = async (req, res) => {
  const url = req.body.url;
  if (!checkValidUrl(url)) {
    return res.status(500).json({
      success: false,
      message: "Please provide a valid image Url",
    });
  }
  const data = await saveAndResizeImage(url);
  switch (data.status) {
    case 200:
      return res.status(200).sendFile(data.outputFilePath);
    case 500:
      return res.status(500).json(data);
  }
};
