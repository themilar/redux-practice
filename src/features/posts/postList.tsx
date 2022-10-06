import { useSelector } from "react-redux";
import {
  selectAllPosts,
  Posts,
  selectPostsStatus,
  selectPostsError,
} from "./postSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostList(): JSX.Element {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

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
  return <section>{content}</section>;
}
