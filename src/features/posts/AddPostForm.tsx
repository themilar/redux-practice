import { useState, SyntheticEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
function AddPostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(0);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);

  const handleTitleChange = (e: SyntheticEvent<HTMLInputElement>) =>
    setTitle((e.target as HTMLInputElement).value);
  const handleContentChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLInputElement).value);
  const handleAuthorChange = (e: SyntheticEvent<HTMLSelectElement>) =>
    setUserId(Number((e.target as HTMLInputElement).value));

  const handlePostSave = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId(0);
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2 className="text-2xl">Add a New Post</h2>
      <form className="flex flex-col">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          className="p-2  bg-gray-300"
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
          className="p-2  bg-gray-300"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          className="p-2  bg-gray-300"
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button
          className="bg-green-400 mt-1"
          type="button"
          onClick={handlePostSave}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}
export default AddPostForm;
