"use client";

import "./profile.scss";
import { useParams } from "next/navigation";
import PostList from "@components/PostList/PostList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const params = useParams();
  const username = params.user;
  const sessionUsername = session?.user.email.split("@")[0];

  // fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${username}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <section className="profile">
      {user && (
        <>
          <Image
            src={user.image}
            width="0"
            height="0"
            sizes="100vw"
            alt="user posted image"
            className="profile-picture"
          />
          <h2>{user.username}</h2>
          {username === sessionUsername && <Link href={`/edit/users/${sessionUsername}`}>Edit Profile</Link>}
          <span className="user-posts-header">Posts</span>
        </>
      )}
      <PostList url={`/api/users/${username}/posts`} />
    </section>
  );
};

export default Profile;
