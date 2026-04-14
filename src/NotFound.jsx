import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-8xl font-extrabold text-sky-400">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-400 mt-2 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/login"
        className="mt-6 px-6 py-2 bg-sky-400 text-black font-semibold rounded-lg hover:bg-sky-300 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
