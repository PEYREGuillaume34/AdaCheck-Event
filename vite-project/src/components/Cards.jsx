import { useState, useEffect } from "react";

export default function Cards({ offset, limit, query = "", onCountChange }) {
  const [allCards, setAllCards] = useState([]); // toutes les cartes
  const [filteredCards, setFilteredCards] = useState([]); // après recherche
  const [expanded, setExpanded] = useState({});
  const noImg = "https://c.tenor.com/51xvC35-fDEAAAAd/tenor.gif";

  // 🔹 Charger toutes les données une seule fois
  const loadData = async () => {
    try {
      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=90"
      );
      const data = await response.json();
      setAllCards(data.results || []);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setAllCards([]);
    }
  };

  // 🔹 Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Filtrer selon la query (insensible à la casse)
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

    // ✅ notifier le parent du nombre total filtré
    if (onCountChange) onCountChange(results.length);
  }, [allCards, query]);

  // 🔹 Pagination sur les résultats filtrés
  const pagedCards = filteredCards.slice(offset, offset + limit);

  // 🔹 Gestion du bouton "Voir plus"
  function toggle(id) {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  // 🔹 Loading
  if (!allCards.length) return <div>Loading...</div>;

  // 🔹 Rendu
  return (
    <div>
      {pagedCards.map((el) => (
        <div
          className="flex m-2 border rounded-xl gap-4 p-2 items-start"
          key={el.event_id}
        >
          <img
            className="m-2 max-h-40 w-40 object-cover rounded-xl"
            src={el.cover_url || noImg}
            alt={el.title}
          />

          <div className="flex-1">
            <h2 className="m-2 inline-block w-full bg-blue-500 text-white rounded-xl px-2 py-1">
              {el.title}
            </h2>

            {expanded[el.event_id] ? (
              <div
                className="m-2 text-sm"
                dangerouslySetInnerHTML={{ __html: el.description }}
              />
            ) : (
              <p className="m-2 text-sm">{el.lead_text}</p>
            )}

            <button
              onClick={() => toggle(el.event_id)}
              className="text-blue-600 hover:underline"
            >
              {expanded[el.event_id] ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        </div>
      ))}

      {pagedCards.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}
