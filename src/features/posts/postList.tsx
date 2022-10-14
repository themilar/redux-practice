import { useSelector } from "react-redux";
import {
  selectPostIds,
  selectPostsStatus,
  selectPostsError,
} from "./postSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostList(): JSX.Element {
  const orderedPostIds = useSelector(selectPostIds);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
}
