import { BookOpen } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SearchSect from "./SearchSect";
import BookPage from "./BookPage";
import NotFound from "./NotFound";
import { useState } from "react";

//Component created to be able to navigate back to Home Page by clicking on application name
const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-center mb-10 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <BookOpen size={43} />
      <h1 className="text-5xl text-gray-800">Book Finder</h1>
    </div>
  );
};

const App = () => {
  //Lifted state up so that search results persist while routing to pages
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <SearchSect
              books={books}
              setBooks={setBooks}
              query={query}
              setQuery={setQuery}
            />
          }
        />
        {/* BookPage component created for detailed info about a book */}
        <Route path="/book/:id" element={<BookPage />} />

        {/* to handle all error prone URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
