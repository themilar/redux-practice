import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="bg-pink-600 text-3xl text-slate-100 p-4 flex ">
      <h2>Redux Blog</h2>
      <nav className="ml-auto ">
        <ul className="flex space-x-8 ">
          <li>
            <Link to="/" className="text-slate-100 text-2xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="post" className="text-slate-100 text-2xl">
              Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
