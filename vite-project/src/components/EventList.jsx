import { useState, useEffect } from "react";
import Cards from "./Cards";

export default function EventList({ offset, limit, query = "", onCountChange, filters = {} }) {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [statesId, setStatesId] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [fav, setFav] = useState([]);

  // au demarrage : fetch et setAllCards
  useEffect(() => {
    async function loadData() {
      try {

        // Construction des paramètres de recherche
        const params = new URLSearchParams();

        // Paramètres de base
        params.set("limit", String(limit));
        params.set("offset", String(offset));

        // Recherche côté API (sensible à la casse)
        if (query) {
          params.set("where", `'%${query}%'`);
        }

        // Ajout des filtres
        const whereConditions = [];
        if (filters.price_type) {
          whereConditions.push(`price_type='${filters.price_type}'`);
        }
        if (filters.acces_type) {
          whereConditions.push(`access_type='${filters.acces_type}'`);
        }
        if (whereConditions.length > 0) {
          const existingWhere = params.get("where");
          const filterWhere = whereConditions.join(" and ");
          params.set("where", existingWhere
            ? `(${existingWhere}) and (${filterWhere})`
            : filterWhere
          );
        }

        const response = await fetch(
          `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?${params}`
        );
        const data = await response.json();
        setAllCards(data.results || []);
        setTotalCount(data.total_count || (data.results ? data.results.length : 0));
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setAllCards([]);
        setTotalCount(0);
      }
    }
    loadData();
  }, [offset, limit, query, filters]);

  // Filtrage insensible à la casse côté client
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
    if (onCountChange) onCountChange(totalCount);
  }, [allCards, query, onCountChange, totalCount]);

  // creation du tableau d'états par id pour see more
  useEffect(() => {
    if (filteredCards.length) {
      const allStates = filteredCards.map(el => ({ id: el.event_id, status: false }));
      setStatesId(allStates);
    }
  }, [filteredCards]);

  // creation du tableau d'états par id pour favoris
  useEffect(() => {
    if (filteredCards.length) {
      const favStates = filteredCards.map(el => ({ id: el.event_id, status: false }));
      setFav(favStates);
    }
  }, [filteredCards]);

  // Fonctions toggle à l'id selectionnée a partir du tableau d'etats seemore
  function toggle(id) {
    setStatesId((prev) => // on map sur stastesId en parametre un met prev (autremet dit un tableau)
      prev.map((obj) => // à chaque objet de ce tableau 
        obj.id === id ? { ...obj, status: !obj.status } : obj // onv conserve l'element on change juste la valeur de "status:" par l'inverse
      )
    );
  }
  
  // Fonction qui retourne un etat seemore
     function returnState(id) {
       const found = statesId.find((obj) => obj.id === id);
       return found ? found.status : false;
     }

  // Fonctions toggle à l'id selectionnée a partir du tableau d'etats fav
  function toggleFav(id) {
    setFav((prev) => // on map sur stastesId en parametre un met prev (autremet dit un tableau)
      prev.map((favoris) => // à chaque favoris de ce tableau 
        favoris.id === id ? { ...favoris, status: !favoris.status } : favoris // onv conserve l'element on change juste la valeur de "status:" par l'inverse
      )
    );
  }
    // Fonction qui retourne un etat seemore
     function returnStateFav(id) {
       const found = fav.find((obj) => obj.id === id);
       return found ? found.status : false;
     }



    // Il faut TOUJOURS que le composant retourne quelque chose, même en loading.
    if (!allCards.length) {
      return <div>Loading...</div>;
    }
    if (!filteredCards.length) {
      return <div>Aucun événement trouvé.</div>;
    }

    // ✅ On passe tout ce qu’il faut à Cards
    return (
      <Cards
        EventList={filteredCards}
        toggle={toggle}
        returnState={returnState}
        toggleFav={toggleFav}
        returnStateFav={returnStateFav}
      />
    );
  }
