import { ref, deleteObject } from "firebase/storage";
import { imageStorage } from "@utils/firebase";

// delete image from firebase
export const deleteImage = async (firebaseImage) => {
    const desertRef = ref(imageStorage, `/uploads/${firebaseImage}`);

    const res = await deleteObject(desertRef)
    .then(() => {
        return true;
    })
    .catch((err) => {
        return false;
    })

    return res;
}