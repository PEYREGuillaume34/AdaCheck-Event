import { useState } from "react";
import "./App.css";
import EventList from "./components/EventList";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";

function App() {
  const limit = 5; // nombre d'event par page
  const [page, setPage] = useState(1); //
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  function goNextPage() {
    const newPage = page + 1;
    const newOffset = newPage * limit - limit;
    setPage(newPage);
    setOffset(newOffset);
  }

  function goPrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      const newOffset = newPage * limit - limit;
      setPage(newPage);
      setOffset(newOffset);
    }
  }

  return (
    <div className="p-4">
      <SearchBar
        onSearch={(q) => {
          setQuery(q);
          setOffset(0);
          setPage(1);
        }}
      />

      {totalResults > 0 && (
        <p className="text-gray-600 mb-2">
          {totalResults} évènement{totalResults > 1 ? "s" : ""} trouvé
        </p>
      )}

      {/* ✅ On appelle maintenant EventList */}
      <EventList
        offset={offset}
        limit={limit}
        query={query}
        onCountChange={setTotalResults}
      />

      <div className="inline-flex gap-10 mt-4 items-center">
        <Button onClick={goPrevPage} disabled={page === 1}>
          Prev
        </Button>
        <p>{page}</p>
        <Button
          onClick={goNextPage}
          disabled={offset + limit >= totalResults}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
