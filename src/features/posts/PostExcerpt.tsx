import { Link } from "react-router-dom";

import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import { Posts } from "./postSlice";
import PostAuthor from "./PostAuthor";
function PostExcerpt({ post }: { post: Posts }) {
  return (
    <article className="border-y-2 border-sky-500 my-2 p-4">
      <h3 className="text-2xl font-bold">{post.title}</h3>
      <p>{post.body?.substring(0, 75)}...</p>
      <p className="postCredit flex gap-4 justify-center">
        <span>
          <Link to={`post/${post.id}`}>View Post</Link>
        </span>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostExcerpt;
