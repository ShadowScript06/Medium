import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogFormPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  // Make sure 'token' is defined or imported above
  // Replace with your actual token or get it from context/state

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const res = await axios.post(
        "https://backend.prajwaljadhav051.workers.dev/api/v1/blog",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <form className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5">
          <h2 className="text-2xl font-bold text-center text-white">
            Write a Blog
          </h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your blog title"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              rows={6}
              placeholder="Write your blog content..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 px-4 py-2 resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            onClick={handlePublish}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogFormPage;
