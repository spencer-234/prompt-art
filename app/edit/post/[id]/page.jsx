"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@components/Form/Form";

const EditPost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      await fetch(`/api/post/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          const userPost = data.post;
          setPost({
            ...userPost,
          });
        })
        .catch((err) => console.error(err));
    };

    fetchPost();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch(`/api/post/${post._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt: post.prompt,
        ai: post.ai,
      })
    })
    .then((res) => {
        setSubmitting(false);
        router.push(`/profile/${session.user.username}`);
    })
    .catch((err) => {
      setSubmitting(false);
      console.error(err);
    }); 
  };

  return (
    <>
      {session?.user.id === post.creator && (
        <section>
          <Form
            type="Update"
            setPost={setPost}
            post={post}
            handleSubmit={handleUpdate}
            submitting={submitting}
          />
        </section>
      )}
    </>
  );
};

export default EditPost;
