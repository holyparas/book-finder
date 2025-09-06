import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-3xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-4">
        The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-800"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
