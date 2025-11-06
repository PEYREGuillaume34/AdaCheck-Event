import { useState } from "react";
import "./App.css";
import EventList from "./components/EventList";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

function App() {
  const limit = 6; // nombre d'event par page
  const [page, setPage] = useState(1); // page affichée
  const [offset, setOffset] = useState(0);  // nombre d'events "sautés" à l'affichage
  const [query, setQuery] = useState(""); // recherche value clavier
  const [totalResults, setTotalResults] = useState(0); // nombre d'events trouvés
  const [filters, setFilters] = useState({}); // état des filtres appliqués


  // pour bouton next page
  function goNextPage() {
    const newPage = page + 1; // on ajoute un a page actuel
    const newOffset = newPage * limit - limit; // calcul de l'offset en fonction de la page
    setPage(newPage); // on recatualise page
    setOffset(newOffset); // on reactualise offset
  }

  // pour bouton prev IDEM en negatif
  function goPrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      const newOffset = newPage * limit - limit;
      setPage(newPage);
      setOffset(newOffset);
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-blue-600 pb-2">
        AdaCheck'Event
      </h1>
      <SearchBar
        onSearch={(q) => {
          setQuery(q);
          setOffset(0);
          setPage(1);
        }}
      // on passe a search bar query en props 
      // a chaque reactualisation de query tu actualise query 
      // + tu reviens a page 1 avec un offset de 0 (normal pour une recherche)
      />


      {/* ici petite balise pour indiquer le nombre d'evenements trouvés*/}
      {totalResults > 0 && (
        <p className="text-lg text-gray-700 mb-4 font-medium">
          <span className="font-bold text-blue-600">{totalResults}</span> événement{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}.
        </p>
      )}

       {/* ⚙️ Filtres */}
      <Filter
        filters={filters}
        onChange={setFilters}
      />
      {/* {console.log("Filtres appliqués dans App.jsx :", filters)} */}
      

      {/* On appelle maintenant EventList */}
      <EventList
        offset={offset}
        limit={limit}
        query={query}
        onCountChange={setTotalResults}
        filters={filters}
      />

      <div className="flex justify-center items-center space-x-8 mt-10 p-4 bg-white rounded-xl shadow-inner border border-gray-200">
        <Button onClick={goPrevPage} disabled={page === 1}>
          Prev
        </Button>
        <p className="text-xl font-bold text-gray-800"> Page {page}</p>
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
