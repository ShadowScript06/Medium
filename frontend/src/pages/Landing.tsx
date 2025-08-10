import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-6 text-gray-100">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center max-w-4xl drop-shadow-md">
        Welcome to <span className="text-gray-300">YourBlog</span> — Share your stories with the world
      </h1>
      <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-10 text-center leading-relaxed">
        Join a community of writers and readers. Create, explore, and connect through compelling blog posts.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate('/signin')}
          className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="border-2 border-gray-700 hover:bg-gray-700 hover:text-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
