import { useState, useEffect } from "react";
import Button from "./Button";

// composant qui recupere  les infos limit et offset
export default function Cards({ offset, limit }) {

  const [card, setCards] = useState(undefined);
  const [expanded, setExpanded] = useState({});

  const noImg = 'https://c.tenor.com/51xvC35-fDEAAAAd/tenor.gif'

  // fonction qui recupere la data
  const loadData = async () => {
    // ici limit et offset sont injectée dans l'appel d'API
    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    setCards(data.results);
  };

  // use effect ecoute 'offset' et 'limit'
  // dès qu'ils sont modifiés il relance 'loadData'
  useEffect(() => { loadData() }, [offset, limit]);

  // fonction qui inverse ! la valeur de expanded (true or false)
  function toggle() {
    setExpanded(!expanded);
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
          <div className="flex m-2 border rounded-xl gap-10 p-1" key={el.event_id}>

            {/* ici on affiche l'image si il y en a une sinon une image par default */}
            {el.cover_url ? <img className="m-2 start-block max-h-100 max-w-100 rounded-xl" src={el.cover_url}></img> : <img className="m-2 start-block max-h-100 max-w-100 rounded-xl" src={noImg} />}

            {/* affichage du titre*/}
            <div >
              <h2 className="m-2 inline-block  w-100 bg-blue-500 text-white rounded-xl">
                {el.title}
              </h2>

              {/* <p>{el.event_id}</p> */}

              {/* carte depliée ou pas */}
              {expanded ? <div dangerouslySetInnerHTML={{ __html: el.description }}></div> : <p>{el.lead_text}</p>}

              <button onClick={toggle}>
                {expanded ? "See less" : "See more"}
              </button>

            </div>

            <br></br>
          </div>

        ))}
      </div>
    </>
  );

}

