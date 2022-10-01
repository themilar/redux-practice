import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import PostList from "./components/posts/postList";
import AddPostForm from "./components/posts/addPostForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <AddPostForm />
      <PostList />
    </div>
  );
}

export default App;
