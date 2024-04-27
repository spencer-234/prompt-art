import "./postcard.scss";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post, image, userPost }) => {
  const fromNow = moment(post.createdAt).fromNow();

  return (
    <div className="post-card">
      <div className="user-box">
        <Image
          src={post.creator.image}
          width={50}
          height={50}
          alt="user profile picture"
        />
        <div className="user-info">
          <Link href={`/profile/${post.creator.username}`}>
            {post.creator.username}
          </Link>
          <span className="time">{fromNow}</span>
        </div>
      </div>
      <p>
        AI used: <span>{post.ai}</span>
      </p>
      <p>
        Prompt: <span>{post.prompt}</span>
      </p>
      <Image
        src={image}
        width="0"
        height="0"
        sizes="100vw"
        className="post-image"
        alt="user posted image"
      />
      {userPost && (
        <div className="post-options">
          <Link href="#">Edit</Link>
          <Link href="#">Delete</Link>
        </div>
      )}
    </div>
  );
};

export default PostCard;
