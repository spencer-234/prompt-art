"use client";

import "./postlist.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import PostCard from "@components/PostCard/PostCard";

const PostList = ({ url, homepage }) => {
  const [data, setData] = useState([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [searchResults, setSearchResults] = useState(null);

  // fetch posts then get the download url for each image from firebase
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      console.log(data);

      setData(data);
    };

    fetchPosts();
  }, []);

  const handleResults = (e) => {
    setSearchResults(
      data.filter((post) => post.prompt.includes(e.target.value))
    );
  };

  return (
    <section className="post-list">
      {homepage && (
        <input
          type="text"
          placeholder="Search for a prompt..."
          onChange={handleResults}
        />
      )}
      {!searchResults && data ? (
        <>
          {data.map((post, index) => (
            <PostCard
              post={post}
              key={index}
              userPost={
                `/profile/${session?.user.username}` === pathname ? true : false
              }
            />
          ))}
        </>
      ) : searchResults ? (
        <>
          {searchResults.map((post, index) => (
            <PostCard
              post={post}
              key={index}
              userPost={
                `/profile/${session?.user.username}` === pathname ? true : false
              }
            />
          ))}
        </>
      ) : (
        <span>Loading...</span>
      )}
    </section>
  );
};

export default PostList;
