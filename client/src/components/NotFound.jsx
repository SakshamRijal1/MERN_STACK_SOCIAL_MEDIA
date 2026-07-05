import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-gray-500">Page not found.</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}