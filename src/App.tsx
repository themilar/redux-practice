import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import PostList from "./features/posts/postList";
import AddPostForm from "./features/posts/AddPostForm";
import UpdatePostForm from "./features/posts/UpdatePostForm";
import PostDetailPage from "./features/posts/PostDetail";
import Layout from "./components/Layout";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
function App() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />}></Route>
          <Route path="post">
            <Route index element={<AddPostForm />}></Route>
            <Route path=":postId" element={<PostDetailPage />} />
            <Route path="edit/:postId" element={<UpdatePostForm />} />
          </Route>
          <Route path="user">
            <Route index element={<UsersList />}></Route>
            <Route path=":userId" element={<UserPage />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
