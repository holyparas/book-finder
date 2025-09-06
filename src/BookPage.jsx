import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Image } from "lucide-react";

const BookPage = () => {
  const { id } = useParams(); // book ID (cover_edition_key or olid)
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("book: ", book);
  console.log("author: ", authors);

  useEffect(() => {
    const fetchBookAndAuthors = async () => {
      try {
        setLoading(true);

        // 1. Fetch book details
        const res = await fetch(`https://openlibrary.org/books/${id}.json`);
        const data = await res.json();
        setBook(data);

        // 2. Fetch authors in parallel (if any)
        if (data.authors && data.authors.length > 0) {
          const authorPromises = data.authors.map(async (a) => {
            const res = await fetch(`https://openlibrary.org${a.key}.json`);
            return res.json();
          });

          const authorsData = await Promise.all(authorPromises);
          setAuthors(authorsData);
        }
      } catch (err) {
        console.error("Error fetching book or authors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndAuthors();
  }, [id]);

  if (loading) {
    return <p className="text-6xl text-center mt-7">Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  const coverUrl = id
    ? `https://covers.openlibrary.org/b/olid/${id}-L.jpg`
    : null;

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-around p-6 gap-6">
      {/* Book cover */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto rounded shadow"
        />
      ) : (
        // Render an empty photo if no cover found
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-80 md:h-[500px] flex items-center justify-center text-gray-400 border rounded">
          <Image size={60} />
        </div>
      )}

      {/* Book details */}
      <div className="flex flex-col items-baseline justify-start max-w-full lg:max-w-xl ml-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{book.title}</h1>
        {book.subtitle && (
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            {book.subtitle}
          </p>
        )}
        <p className="mb-1 text-sm sm:text-base">
          <strong>Authors:</strong>{" "}
          {authors.length > 0
            ? authors.map((a) => a.name).join(", ")
            : "Unknown"}
        </p>
        <p className="mb-1 text-sm sm:text-base">
          <strong>Published:</strong>{" "}
          {book.publish_date ? book.publish_date : "N/A"}
        </p>
        <p className="mb-1 text-sm sm:text-base">
          <strong>Pages:</strong>{" "}
          {book.number_of_pages ? book.number_of_pages : "N/A"}
        </p>
        <p className="mb-1 text-sm sm:text-base">
          <strong>ISBN-10:</strong> {book.isbn_10 ? book.isbn_10[0] : "N/A"}
        </p>
        <p className="mb-1 text-sm sm:text-base">
          <strong>ISBN-13:</strong> {book.isbn_13 ? book.isbn_13[0] : "N/A"}
        </p>
        <p className="mb-1 text-sm sm:text-base">
          <strong>Format:</strong>{" "}
          {book.physical_format ? book.physical_format : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
