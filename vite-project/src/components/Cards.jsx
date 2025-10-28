import { useEffect, useState } from 'react'

export default function Cards() {
    
    const [card, setCards] = useState()

  const loadData = async () => {
    const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
    const data = await response.json()
    setCards(data.results)
  }

  useEffect(() => {
    loadData()
  },[]);

   if (card === undefined) {
        return <div>Loading...</div>;
    }
  

  return (
    <>
    <div>
       {card.map((el) => (
        <div key={el.event_id}>
          <h2>{el.title}</h2>
          <p>{el.description.replace(/<[^>]+>/g, '')}</p>
        </div>
      ))}
    </div>

    </>
  )
}


