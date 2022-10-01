import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import { Posts } from "./postSlice";
import PostAuthor from "./PostAuthor";
function PostExcerpt({ post }: { post: Posts }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body?.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostExcerpt;
