import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsById, updatePost, deletePost } from "./postSlice";
import { useParams, useNavigate } from "react-router-dom";

import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { selectAllUsers } from "../users/usersSlice";

const UpdatePostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state: RootState) =>
    selectPostsById(state, Number(postId))
  );
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(Number(post?.userId));
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch<AppDispatch>();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const handleTitleChange = (e: SyntheticEvent<HTMLInputElement>) =>
    setTitle((e.target as HTMLInputElement).value);
  const handleContentChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLInputElement).value);
  const handleAuthorChange = (e: SyntheticEvent<HTMLSelectElement>) =>
    setUserId(Number((e.target as HTMLInputElement).value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const handlePostSave = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId(0);
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId(0);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2 className="text-2xl">Edit Post</h2>
      <form className="flex flex-col">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          className="p-2 bg-gray-100 border-2 border-gray-400"
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={handleAuthorChange}
          className="p-2 bg-gray-100 border-2 border-gray-400"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          className="p-2 bg-gray-100 border-2 border-gray-400"
          onChange={handleContentChange}
        />
        <button
          type="button"
          onClick={handlePostSave}
          disabled={!canSave}
          className="bg-blue-400 my-4"
        >
          Save Post
        </button>
        <button
          className="deleteButton bg-red-400 my-4"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default UpdatePostForm;
