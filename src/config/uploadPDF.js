import cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "./globalKey.js";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "file-project",
    allowedFormats: ["jpg", "png", "pdf"],
  });

// const UploadPDF = async (file,oldFile) => {
//   try {
//     if (!file) return "";
//     if (oldFile) {
//       const spliturl = oldImage.split("/");
//       const img_id = spliturl[spliturl.length - 1].split(".")[0];
//       await cloudinary.uploader.destroy(img_id);
//     };
//     console.log(file);
//     const imageBase64 = Buffer.from(file.data).toString('base64');
//     const imageName = `data:image/msword;base64,${imageBase64}`
//     const res_upload = await cloudinary.uploader.upload(imageName, null, {
//       public_id: `${Date.now()}`,
//       resource_type: "auto",
//     });
//     console.log(res_upload.url);
//     return `${res_upload.url}`;
//   } catch (err) {
//     console.log(err)
//     return "";
//   }
// };

export default UploadPDF;
