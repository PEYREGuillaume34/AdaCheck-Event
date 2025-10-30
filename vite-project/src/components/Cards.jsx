import { useState, useEffect } from "react";
import Button from "./Button";

// composant qui recupere  les infos limit et offset
export default function Cards({ offset, limit }) {

  const [card, setCard] = useState(undefined);
  const [state, setState] = useState(false);
  const [statesId, setStatesId] = useState([]);
  const [seeButton, setSeeButton] = useState(false);

  const noImg = 'https://c.tenor.com/51xvC35-fDEAAAAd/tenor.gif'

  // fonction qui recupere la data
  const loadData = async () => {
    // ici limit et offset sont injectée dans l'appel d'API
    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    setCard(data.results);
  };



  // use effect ecoute 'offset' et 'limit'
  // dès qu'ils sont modifiés il relance 'loadData'
  useEffect(() => { loadData() }, [offset, limit]);

  // useEffect ecoute card
  // a chaque modif statesId est rempli avec id des cartes et status à false
  useEffect(() => {
    if (card) {
      const allStates = card.map(el => ({ id: el.event_id, status: state }));
      setStatesId(allStates);
    }
  }, [card]);


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
  if (card === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {/*on map sur la data et on affiche systematiquement tels et tels elements par carte*/}
        {card.map((el) => (

          // ici on donne une id a la div c'est celle de l'annonce sur l'API
          < div className="flex m-2 border rounded-xl gap-10 p-1" key={el.event_id} >

            {/* ici on affiche l'image si il y en a une sinon une image par default */}
            {el.cover_url ? <img className="m-2 start-block max-h-100 max-w-100 rounded-xl" src={el.cover_url}></img> : <img className="m-2 start-block max-h-100 max-w-100 rounded-xl" src={noImg} />}

            {/* affichage du titre*/}
            < div >
              <h2 className="m-2 inline-block  w-100 bg-blue-500 text-white rounded-xl">
                {el.title}
              </h2>

              <p>{el.event_id}</p>

              {/* carte depliée ou pas */}
              {returnState(el.event_id) ? <div dangerouslySetInnerHTML={{ __html: el.description }} ></div> : <p>{el.lead_text}</p>}

              <button className="m-5" onClick={() => toggle(el.event_id)}> {returnState(el.event_id) ? 'See Less' : 'See More'} </button>

            </div >

            <br></br>
          </div>

        ))}
      </div>
    </>
  );

}

