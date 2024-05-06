import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageStorage } from "@utils/firebase";
import { v4 } from "uuid";

// upload image to firebase
export const uploadImage = async (image) => {
  const file = image.name.split(".");
  const filename = file[0] + v4() + `.${file[1]}`;
  const imageRef = ref(imageStorage, `/uploads/${filename}`);
  const completedUpload = await uploadBytes(imageRef, image)
    .then(async () => {
      let fileInfo = {};
      fileInfo.name = filename;
      fileInfo.imageLink = await getDownloadURL(ref(imageStorage, `/uploads/${filename}`));
      return fileInfo;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return completedUpload;
}