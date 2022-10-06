import "./App.css";
import { Routes, Route } from "react-router-dom";

import PostList from "./features/posts/postList";
import AddPostForm from "./features/posts/AddPostForm";
import UpdatePostForm from "./features/posts/UpdatePostForm";
import PostDetailPage from "./features/posts/PostDetail";
import Layout from "./components/Layout";

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
