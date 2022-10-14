import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postSlice";

import { useParams, Link } from "react-router-dom";
import { RootState } from "../../app/store";

function UserPage() {
  const { userId } = useParams();
  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(userId))
  );

  const postsForUser = useSelector((state: RootState) =>
    selectPostsByUser(state, Number(userId))
  );
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>
        {user.name}
        <ol>{postTitles}</ol>
      </h2>
    </section>
  );
}

export default UserPage;
