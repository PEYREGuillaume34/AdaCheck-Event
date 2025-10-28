import { useState, useEffect } from "react";



export default function Cards() {

  const [card, setCards] = useState(undefined);

  const loadData = async () => {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
    );
    const data = await response.json();
    setCards(data.results);
    console.log(card);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (card === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {card.map((el) => (
          <div class= "gap-10 p-1" key={el.event_id}>

            <h2 class="m-1 inline-block flex-center w-100 bg-blue-500 text-white rounded-xl" >{el.title}</h2>
            <p>{el.lead_text}</p>
            {/* <div dangerouslySetInnerHTML={{ __html: el.description }}></div> */}
            <br></br>
          </div>
        ))}
      </div>
    </>
  );
}
