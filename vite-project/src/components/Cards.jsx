import { useState, useEffect } from "react";

// composant qui recupere  les infos limit et offset
export default function Cards({ offset, limit, query = "", onCountChange }) {

  const [allCards, setAllCards] = useState([]); // toutes les cartes
  const [filteredCards, setFilteredCards] = useState([]); // après recherche
  const [statesId, setStatesId] = useState([]);
  

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
  }, []); //auparavant offset,limit

  // useEffect ecoute card
  // a chaque modif statesId est rempli avec id des cartes et status à false
  useEffect(() => {
    if (allCards) {
      const allStates = allCards.map(el => ({ id: el.event_id, status: false }));
      setStatesId(allStates);
    }
  }, [allCards]);

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

  // ici l'objectif est de changer le status d'une carte au click en fonction de son id
  function toggle(id) {
    setStatesId(prev =>
      prev.map(obj =>
        obj.id === id
          ? { ...obj, status: !obj.status } // ← copie propre, modifiée
          : obj                             // ← copie intacte
      )
    );
  };
  // on redéfinit StatesId

  // ici on retourne juste l'etat de l'id selectionné
  function returnState(id) {
    // je map sur statesId pour trouver l'id cliqué et retourner son status
    const found = statesId.find(obj => (obj.id === id))
    // quand je la trouve je renvoie son status
    // je dois m'assurer que found existe (ca s epeut qu'il n'existe pas ds le rendu) ca va beuguer
    return found ? found.status : false;
  }

 

  // ... tant que la data n'est pas récupérée
  if (!allCards.length) return <div>Loading...</div>;

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

            {/* <p>{el.event_id}</p> */}

            {/* carte depliée ou pas */}
            {returnState(el.event_id) ? <div dangerouslySetInnerHTML={{ __html: el.description }} ></div> : <p>{el.lead_text}</p>}

            <button className="m-5" onClick={() => toggle(el.event_id)}> {returnState(el.event_id) ? 'See Less' : 'See More'} </button>

          </div >

          <br></br>
        </div>

      ))}

      {pagedCards.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Aucun résultat trouvé.</p>
      )}
    </div>

  );
}
