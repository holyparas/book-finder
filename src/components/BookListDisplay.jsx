import { Image } from "lucide-react";
import { useNavigate } from "react-router";

const BookListDisplay = ({ book }) => {
  //key used to obtain cover photo of the book
  const key = book.cover_edition_key ?? book.edition_key?.[0];

  const navigate = useNavigate();

  const handleClick = () => {
    if (key) {
      //if clicked, navigates user to detailed info about the book
      navigate(`/book/${key}`);
    }
  };

  const coverUrl = key
    ? `https://covers.openlibrary.org/b/olid/${key}-M.jpg`
    : null;

  return (
    <div className="border border-gray-300 rounded p-2 w-40 text-center flex flex-col justify-between shadow">
      <div>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-52 object-cover mb-2 cursor-pointer"
            onClick={handleClick}
          />
        ) : (
          <div className="w-full h-52 flex items-center justify-center text-gray-400">
            <Image size={40} />
          </div>
        )}
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-md text-gray-600">
          {book.author_name?.[0] ?? "Unknown Author"}
        </p>
      </div>

      <button
        className="text-white text-lg bg-gray-700 cursor-pointer rounded mt-2 hover:bg-gray-800 transition-colors"
        onClick={handleClick}
      >
        View
      </button>
    </div>
  );
};

export default BookListDisplay;
