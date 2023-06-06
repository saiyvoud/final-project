
import { UploadImageToServer,removeImage } from "../service/service.js";
export const uploadImageServer = async (oldImage, image) => {
  try {
    if (!image) return "";
    if (oldImage) {
      const removed = await removeImage(oldImage);
      console.log("remove image", removed);
    }
    const imgName = await UploadImageToServer(image);
    return imgName;
  } catch (error) {
    console.log(error);
    return ""
  }
};
