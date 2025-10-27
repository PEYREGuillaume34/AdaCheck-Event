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
          <div key={el.event_id}>
            <h2>{el.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: el.description }}></div>
          </div>
        ))}
      </div>
    </>
  );
}
