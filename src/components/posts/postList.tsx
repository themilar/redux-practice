import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  Posts,
  selectPostsStatus,
  fetchPosts,
  selectPostsError,
} from "./postSlice";
import PostExcerpt from "./PostExcerpt";
import { useEffect } from "react";
import { AppDispatch } from "../../app/store";
let didInit = false;
export default function PostList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      if (status === "idle") dispatch(fetchPosts());
    }
  }, [dispatch, status]);
  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: Posts) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}
