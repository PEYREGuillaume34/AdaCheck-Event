import { useState, useEffect } from "react";
import Button from "./Button";

export default function Cards({ onClickOffset, onClickLimit }) {
  const [cards, setCards] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

  const loadData = async () => {
    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${onClickOffset}&limit=${onClickLimit}`
    );
    const data = await response.json();
    setCards(data.results);
  };

  useEffect(() => {
    loadData();
  }, [onClickOffset, onClickLimit]);

  const toggleExpand = (id) => {
    setExpandedCards((obj) => ({
      ...obj,
      [id]: !obj[id],
    }));
  };

  if (!cards.length) return <div>Loading...</div>;

  return (
    <div>
      {cards.map((el) => {
        const isExpanded = expandedCards[el.event_id];

        return (
          <div
            key={el.event_id}
            className="m-2 border rounded-xl gap-10 p-1 flex items-stretch"
          >
            <img
              className="m-2 w-80 h-auto rounded-lg object-cover"
              src={el.cover_url}
              alt={el.title}
            />
            <div className="flex flex-col justify-between">
              <h2 className="m-2 bg-blue-500 text-white rounded-xl px-2">
                {el.title}
              </h2>
              <p>{el.lead_text}</p>

              {isExpanded && (
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: el.description }}
                ></div>
              )}

              <Button
                isToggled={isExpanded}
                onClick={() => toggleExpand(el.event_id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
