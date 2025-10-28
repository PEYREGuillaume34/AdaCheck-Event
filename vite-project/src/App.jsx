import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards"

function App() {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] =  useState(5);




  return (
    <>
  <div>
    <Cards onClickLimit={limit} onClickOffset={offset}/>
    
   
  </div>
    </>
  );
}

export default App;
