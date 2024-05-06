import Link from "next/link";
import "./form.scss";
import Image from "next/image";

const Form = ({
  type,
  post,
  setPost,
  image,
  setImage,
  handleSubmit,
  submitting,
}) => {
  return (
    <div className="post-form">
      <h2>{type} Post</h2>
      <p>{type} your post and share it with the world!</p>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        {type === "Create" && (
          <label className="image-label">
            <div className="add-image">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Image
                src={"/assets/add_image.png"}
                width={50}
                height={50}
                alt="image upload icon"
              />
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
        )}
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
