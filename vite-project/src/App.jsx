import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Button from "./components/Button";

function App() {

  const limit = 5; // cartes par page
  const [page, setPage] = useState(1); // page en cours
  const [offset, setOffset] = useState(0); // nbr de cartes cachées


  function goNextPage() {
    const newPage = page + 1; // au click page = page + 1
    const newOffset = newPage * limit - limit; // calcul offset (+limit)

    setPage(newPage);// page = newPage
    setOffset(newOffset);// offset = newOffset

    // console.log("onclicknext", newOffset)
  }
  // idem mais en negatif
  function goPrevPage() {
    const newPage = page - 1;
    const newOffset = newPage * limit - limit;

    setPage(newPage);
    setOffset(newOffset);
  }

  return (
    <>
      <div>
        {/* Composant qui affiche un nbr 'limit' de cartes sur la page x */}
        <Cards limit={limit} offset={offset} />

        {/* Pagination */}
        <div className="inline-flex gap-10">
          <Button onClick={goPrevPage}> prev </Button>
          <p>{page}</p>
          <Button onClick={goNextPage}> next </Button>
        </div>

      </div>
    </>
  );
}

export default App;
