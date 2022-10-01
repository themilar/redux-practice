import { useState, SyntheticEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";
import { AppDispatch } from "../../app/store";

function AddPostForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);

  const handleTitleChange = (e: SyntheticEvent<HTMLInputElement>) =>
    setTitle((e.target as HTMLInputElement).value);
  const handleContentChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLInputElement).value);
  const handleAuthorChange = (e: SyntheticEvent<HTMLSelectElement>) =>
    setUserId((e.target as HTMLInputElement).value);

  const handlePostSave = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus;

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handlePostSave} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}
export default AddPostForm;
