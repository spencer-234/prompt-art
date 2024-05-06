import "./postcard.scss";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { deleteId } from "@app/CRUD_fucntions/deleteId";
import { deleteImage } from "@app/CRUD_fucntions/deleteImage";

const PostCard = ({ post, userPost }) => {
  const fromNow = moment(post.createdAt).fromNow();

  const handleDelete = async (e) => {
    e.preventDefault();
    let res = await deleteImage(post.filename);
    if (res === true) {
      await deleteId(`/api/post/${post._id}`)
      .then(data => {
        if (data) {
          window.location.reload();
        } else {
          alert('Post deletion failed');
        }
      })
    }
  }

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
        src={post.image}
        width="0"
        height="0"
        sizes="100vw"
        className="post-image"
        alt="user posted image"
      />
      {userPost && (
        <div className="post-options">
          <Link href={`/edit/post/${post._id}`}>Edit</Link>
          <button type="button" onClick={(e) => handleDelete(e)} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
