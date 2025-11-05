import Favorites from "./Favorites";
import Button from "./Button";

export default function Cards({ EventList, toggle, returnState }) {
  const noImg = "https://c.tenor.com/51xvC35-fDEAAAAd/tenor.gif";

  return (
    <div>
      {EventList.map((event) => (
        <div
          className="relative flex m-2 border rounded-xl gap-4 p-2 items-start"
          key={event.event_id}>

          <div className="absolute top-2 right-2.5">
            <Button> 🙂 </Button>
          </div>

          <img
            className="m-2 max-h-40 w-40 object-cover rounded-xl"
            src={event.cover_url || noImg}
            alt={event.title}
          />

          <div className="flex-1">
            <h2 className="m-2 inline-block w-100 bg-blue-500 text-white rounded-xl px-2 py-1">
              {event.title}
            </h2>

            {returnState(event.event_id) ? (
              <div>
                <p>{event.lead_text}</p>
                <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
              </div>
            ) : (
              <p>{event.lead_text}</p>
            )}
            <div className="absolute bottom-1 right-2.5">
              <Button className="m-10 border-solid" onClick={() => toggle(event.event_id)}>
                {returnState(event.event_id) ? "See Less" : "See More"}
              </Button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
