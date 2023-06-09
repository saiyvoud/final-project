import cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "./globalKey.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const UploadImage = async (oldImage, image) => {
  try {
    if (!image) return "";
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
    const res_upload = await cloudinary.uploader.upload(image, null, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    console.log(res_upload.url);
    return res_upload.url;
  } catch (err) {
    console.log(err)
    return "";
  }
};
export default UploadImage;
