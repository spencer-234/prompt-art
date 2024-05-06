"use client";

import "./postlist.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import PostCard from "@components/PostCard/PostCard";

const PostList = ({ url }) => {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const username = session?.user.email.split("@")[0];

  // fetch posts then get the download url for each image from firebase
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(url);
      const data = await res.json();

      setData(data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <section className="post-list">
          {data.map((post, index) => (
            <PostCard
              post={post}
              key={index}
              userPost={`/profile/${username}` === pathname ? true : false}
            />
          ))}
        </section>
      ) : (
        <span>No Posts Available</span>
      )}
    </>
  );
};

export default PostList;
