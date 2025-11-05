import { useState, useEffect } from "react";
import Cards from "./Cards";

export default function EventList({ offset, limit, query = "", onCountChange }) {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [statesId, setStatesId] = useState([]);
  const [favorite, setFavorite] = useState([]);

 // au demarrage : fetch et setAllCards
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100"
        );
        const data = await response.json();
        setAllCards(data.results || []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setAllCards([]);
      }
    }
    loadData(); 
  }, []);

  // tableau d'états par id
  useEffect(() => {
    if (allCards.length) {
      const allStates = allCards.map(el => ({ id: el.event_id, status: false }));
      setStatesId(allStates);
    }
  }, [allCards]);

  // Filtrer selon la recherche tapée
  useEffect(() => {
    let results = allCards;
    if (query) {
      const q = query.toLowerCase();
      results = allCards.filter(
        (el) =>
          el.title?.toLowerCase().includes(q) ||
          el.lead_text?.toLowerCase().includes(q)
      );
    }
    setFilteredCards(results);
    // onCountChange = setTotalResults (nbr total d'events / de cards)
    if (onCountChange) onCountChange(results.length);
  }, [allCards, query, onCountChange]);

  // Pagination :  [ de premiere,  [...],  à dernière ]
  const pagedCards = filteredCards.slice(offset, offset + limit);

  // Fonctions toggle et returnState
 function toggle(id) {
    setStatesId((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, status: !obj.status } : obj
      )
    );
  }

  function returnState(id) {
    const found = statesId.find((obj) => obj.id === id);
    return found ? found.status : false;
  }

  // Il faut TOUJOURS que le composant retourne quelque chose, même en loading.
  if (!allCards.length) {
    return <div>Loading...</div>;
  }

  // ✅ On passe tout ce qu’il faut à Cards
  return (
    <Cards
      EventList={pagedCards}
      toggle={toggle}
      returnState={returnState}
    />
  );
}
