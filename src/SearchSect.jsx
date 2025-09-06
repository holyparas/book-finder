import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import BookListDisplay from "./components/BookListDisplay";

const SearchSect = ({ books, setBooks, query, setQuery }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("title"); // "title" or "author"
  const inputRef = useRef(null);

  console.log("books: ", books);

  useEffect(() => {
    //Don't fetch on mount
    //Fetches data after user searches for a book, useEffect gets updated by query or by updating searchType
    if (!query) {
      return;
    }
    const fetchBooks = async () => {
      try {
        setError(null);
        const res = await fetch(
          `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(
            query
          )}`
        );

        const data = await res.json();
        console.log("books: ", data.docs);
        setBooks(data.docs);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, [query, searchType]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search); //committing the current input as query term when user clicks on search button or presses enter
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <form
        className="flex items-center mb-2 justify-center gap-1"
        onSubmit={handleSubmit} //gathers book results if user presses "enter" or clicks on "search" icon
      >
        {/* Two options for Select: Book Title or Author*/}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-20 h-12 border border-gray-300 rounded px-2 text-gray-800 focus:outline-none text-xs"
        >
          <option value="title" className="text-gray-800">
            Book Title
          </option>
          <option value="author">Author</option>
        </select>

        {/* Responsive input button */}
        <input
          className="w-[170px] sm:w-sm lg:w-xl h-12 border border-gray-300 rounded px-3 focus:outline-none text-gray-700"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search"
          ref={inputRef}
        />
        <button
          type="submit"
          className="border border-gray-300 rounded px-3 h-12"
        >
          <Search color="gray" />
        </button>
      </form>
      {/* Responsive display grid of books */}
      <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-1 justify-items-center">
        {books.map((book) => (
          <BookListDisplay book={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchSect;
