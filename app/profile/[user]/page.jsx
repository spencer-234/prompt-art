"use client";

import "./profile.scss";
import { useParams } from "next/navigation";
import PostList from "@components/PostList/PostList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { uploadImage } from "@app/CRUD_fucntions/uploadImage";
import { deleteImage } from "@app/CRUD_fucntions/deleteImage";

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const params = useParams();
  const username = params.user;

  const [image, setImage] = useState(null);

  // fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${username}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (user.filename) {
      await deleteImage(user.filename);
    }
    const upload = await uploadImage(image);
    if (upload) {
      await fetch(`/api/users/${session?.user.email.split("@")[0]}`, {
        method: "PATCH",
        body: JSON.stringify({
          image: upload.imageLink,
          filename: upload.name,
          userId: session?.user.id,
        }),
      })
        .then((res) => {
          console.log(res.maessage);
          setSubmitting(false);
          window.location.reload();
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
        });
    }
  };

  return (
    <section className="profile">
      {user && (
        <>
          <label>
            <Image
              src={image ? URL.createObjectURL(image) : user.image}
              width="0"
              height="0"
              sizes="100vw"
              alt="user posted image"
              className="profile-picture"
            />
            {session?.user.id === user._id && (
              <>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <Image
                  src="/assets/add_image.png"
                  width={30}
                  height={30}
                  className="add-image-icon"
                  alt="add image icon"
                />
              </>
            )}
          </label>
          {image && (
            <button
              onClick={(e) => handleSave(e)}
              type="button"
              className="save-btn"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          )}
          <h2>{user.username}</h2>
          <span className="user-posts-header">Posts</span>
        </>
      )}
      <PostList url={`/api/users/${username}/posts`} />
    </section>
  );
};

export default Profile;
