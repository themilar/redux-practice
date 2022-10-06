import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectPostsById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import { RootState } from "../../app/store";

function PostDetailPage() {
  const { postId } = useParams();
  const post = useSelector((state: RootState) =>
    selectPostsById(state, Number(postId))
  );
  if (!post) {
    return (
      <section>
        <h2>Page Not Found!</h2>
      </section>
    );
  }

  return (
    <article className="my-2 p-4">
      <h3 className="text-2xl font-bold">{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit flex gap-4 justify-center">
        <span>
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        </span>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostDetailPage;
