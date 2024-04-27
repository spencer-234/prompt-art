"use client";

import { ref, uploadBytes } from "firebase/storage";
import { imageStorage } from "@utils/firebase";
import { useState } from "react";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./form.scss";
import Image from "next/image";

const Form = ({ type, url, session }) => {
  // state to prevent user from sending post request in succession
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    ai: "",
  });
  const [image, setImage] = useState(null);

  // function to upload image to firebase and return url for db
  const upload = async () => {
    // set filename to store in db
    const file = image.name.split(".");
    const filename = file[0] + v4() + `.${file[1]}`;
    const imageRef = ref(imageStorage, `/uploads/${filename}`);
    const completedUpload = await uploadBytes(imageRef, image)
      .then(() => {
        console.log("Image uploaded!");
        return filename;
      })
      .catch((err) => console.error(err));
    if (completedUpload === filename) {
      return filename;
    } else {
      return "";
    }
  };

  // send post data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let imageLink = await upload();
    if (imageLink) {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          image: imageLink,
          prompt: post.prompt,
          userId: session,
          ai: post.ai,
        }),
      })
        .then((res) => console.log("Post Created!"))
        .catch((err) => console.error(err))
        .finally(() => {
          setSubmitting(false);
          router.push("/");
        });
    } else {
      alert("Failed to create post.");
      setSubmitting(false);
    }
  };

  return (
    <div className="post-form">
      <h2>{type} Post</h2>
      <p>{type} your post and share it with the world!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>AI used</span>
          <input
            value={post.ai}
            onChange={(e) => setPost({ ...post, ai: e.target.value })}
            required
          />
        </label>
        <label>
          <span>Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
          ></textarea>
        </label>
        <label className="image-label">
          <div className="add-image">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Image src={"/assets/add_image.png"} width={50} height={50} alt="image upload icon"/>
            <span>Add Image</span>
          </div>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              width="0"
              height="0"
              sizes="100vw"
              className="image-preview"
              alt="image preview"
            />
          )}
        </label>
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            {submitting && type === "Create"
              ? "Creating Post..."
              : submitting && type === "Update"
              ? "Updating Post...."
              : `${type} Post`}
          </button>
          <Link href="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
