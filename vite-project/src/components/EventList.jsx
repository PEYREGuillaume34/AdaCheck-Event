import { useState, useEffect } from "react";
import Cards from "./Cards";

export default function EventList({ offset, limit, query = "", onCountChange, filters = {} }) {
  const [allCards, setAllCards] = useState([]); //recuperation data
  const [filteredCards, setFilteredCards] = useState([]);// data transformée une fois frappe filtre ou prev ou next
  const [statesId, setStatesId] = useState([]); // c'est le tableau d'etats pour toggle seeMore seeLess
  const [totalCount, setTotalCount] = useState(0); // total d'events renvoyés par API
  const [fav, setFav] = useState([]); // c'est le tableau d'etats pour toggle Favoris



  // au demarrage : fetch et setAllCards
  useEffect(() => {
    async function loadData() {
      try {

        // Construction des paramètres de recherche
        const params = new URLSearchParams();

        // Paramètres de base
        params.set("limit", String(limit));
        params.set("offset", String(offset));

        // query trouvée ds dans API 
        if (query) {
          params.set("where", `'%${query}%'`);
        }

        // Ajout des filtres
        const whereConditions = []; //tableau vide pour construire parametres
        if (filters.price_type) { // si il existe on ajoute le filtre ou par def
          whereConditions.push(`price_type='${filters.price_type}'`);
        }
        if (filters.acces_type) { // pareil
          whereConditions.push(`access_type='${filters.acces_type}'`);
        }
        if (whereConditions.length > 0) { // si filtres enregistré ou par def
          const existingWhere = params.get("where"); // recupere query
          const filterWhere = whereConditions.join(" and "); // association des filtres
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
    if (onCountChange) onCountChange(totalCount); //  mise a jour du nbr total de nouveaux resultats
  }, [allCards, query, onCountChange, totalCount]);

  // creation du tableau d'états par id pour see more
  useEffect(() => {
    if (filteredCards.length) {
      const allStates = filteredCards.map(el => ({ id: el.event_id, status: false }));
      setStatesId(allStates);
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
  // Fonction qui retourne un etat seemore (pour affichage texte)
  function returnState(id) {
    const found = statesId.find((obj) => obj.id === id);
    return found ? found.status : false;
  }


  // creation du tableau d'états par id pour favoris
  useEffect(() => {
    //recupere le localStorage
    const storage = JSON.parse(localStorage.getItem("fav")) || [];

    // si il y a de la data
    if (filteredCards.length) {
      // crée un tableau d'etat favStates que tu remplis 
      const favStates = filteredCards.map(el => {
        // tu check les id correspondantes entre favstates et localstorage tu renvoie l'element entier si match id
        const match = storage.find(fav => fav.id === el.event_id);
        // console.log("match", match)

        // des que tu as un match tu le renvoie tel quel sinon tu renvoies un objet avec un id celui de l'event et une value : false
        return match ? match : { id: el.event_id, status: false };
      });
      // console.log("localStorage", localStorage)

      // tu actualise fav
      setFav(favStates);
    }
  }, [filteredCards]);


  // Fonctions toggle à l'id selectionnée
  function toggleFav(id) { //tu actualises fav
    setFav((prev) => {// on map sur fav en parametre un met prev (autrement dit une copie de tableau)
      const updated = prev.map((el) => // si id de l'event correspond a un id ds fav
        el.id === id ? { ...el, status: !el.status } : el //tu reconstruit l'objet avec un status inversé // sinon 
      );
      //enfin tu re actualise localStorage
      localStorage.setItem("fav", JSON.stringify(updated)); //tu renvoies ce tableau qui est un update des states
      //on modifie fav en retournant le nouveau tableau dans setFav
      return updated;
    });
  }

  // Fonction qui retourne un etat fav (pour affichage emoticone)
  function returnStateFav(id) {
    const found = fav.find((obj) => obj.id === id);
    return found ? found.status : false;
  }



  // Il faut TOUJOURS que le composant retourne quelque chose, même en loading sinon crash affichage
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
