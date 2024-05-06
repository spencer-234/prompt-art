"use client";

import Form from "@components/Form/Form";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { uploadImage } from "@app/CRUD_fucntions/uploadImage";

const Create = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    ai: "",
  });
  const [image, setImage] = useState(null);

  // send post data to server
  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const upload = await uploadImage(image);
    if (upload) {
      await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          image: upload.imageLink,
          filename: upload.name,
          prompt: post.prompt,
          userId: session?.user.id,
          ai: post.ai,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
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
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "unauthenticated" ? (
        redirect("/")
      ) : (
        <section>
          <Form
            type="Create"
            setPost={setPost}
            post={post}
            image={image}
            setImage={setImage}
            handleSubmit={createPost}
            submitting={submitting}
          />
        </section>
      )}
    </>
  );
};

export default Create;
