import Favorites from "./Favorites";import Button from "./Button";

export default function Cards({ EventList, toggle, returnState, toggleFav, returnStateFav }) {
  const noImg = "https://c.tenor.com/51xvC35-fDEAAAAd/tenor.gif";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {EventList.map((event) => (
        <div
          className="card relative"
          key={event.event_id}>

          <img
            className="w-full h-40 object-cover mb-3 rounded-lg border border-gray-100"
            src={event.cover_url || noImg}
            alt={event.title}
          />

          <div className="card-content">
            <h2 className="font-bold text-xl text-gray-900 line-clamp-2">
              {event.title}
            </h2>

            {returnState(event.event_id) ? (
              <div>
                <p className="mt-2 text-gray-700 text-base line-clamp-3">{event.lead_text}</p>
                <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
              </div>
            ) : (
              <p>{event.lead_text}</p>
            )}

            <button className="text-xl text-center p-8 text-blue-600" onClick={() => toggle(event.event_id)}>
              {returnState(event.event_id) ? "See Less" : "See More"}
            </button>
            <div className="absolute bottom-1 right-1">
              <Button onClick={()=> {
                // {console.log("id", event.event_id)}
                {toggleFav(event.event_id)}} }> 
    
                {returnStateFav(event.event_id)? "🙂" : "🤍" } </Button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
