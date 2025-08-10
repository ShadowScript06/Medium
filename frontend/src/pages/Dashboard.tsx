import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  interface item {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
  }
  const navigate=useNavigate();

  const [blogs, setBlogs] = useState<item[]>([]);
  const [showfeed, setShowFeed] = useState<boolean>(false);
 

  const handleFeed = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        "https://backend.prajwaljadhav051.workers.dev/api/v1/blog",
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (res.data.blogs) {
        setBlogs(res.data.blogs);
        setShowFeed(true);
      } else {
        alert("No Blogs Present");
      }
      console.log("Blogs fetched ");
    } catch (error) {
      console.log(error);
      alert("Internal server Error");
    }
  };

  const handleBlog = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

   navigate('/blogform');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-gray-800 shadow-lg">
        <h1 className="hidden md:flex text-3xl font-extrabold tracking-wide">
          YourBlog Dashboard
        </h1>
        <nav className="flex gap-6">
          <button
            className="px-6 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition text-sm font-semibold shadow-md cursor-pointer"
            onClick={handleBlog}
          >
            Write Blog
          </button>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition text-sm font-semibold shadow-md cursor-pointer">
            My Blogs
          </button>
          <button
            onClick={handleFeed}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition text-sm font-semibold shadow-lg cursor-pointer"
          >
            Feed
          </button>
        </nav>
      </header>

      {/* Feed Content */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        {showfeed ? (
          <div className="grid gap-8 md:grid-cols-2">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 truncate">
                  {post.title}
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line break-all">
                  {post.content}
                </p>
                <div className="mt-4 text-xs text-gray-500 italic">
                  {post.published ? "Published" : "Draft"}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg mt-20">
            Click <span className="font-semibold text-indigo-500">Feed</span> to
            load latest blogs.
          </div>
        )}
      </main>

      {/* {WRITE BLOG} */}

     
    </div>
  );
}

export default Dashboard;
