import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, placeholder = "Rechercher..." }) {
  // État local pour stocker ce que l’utilisateur tape
  const [value, setValue] = useState("");

  // À chaque fois que "value" change, on attend 400ms avant d’appeler onSearch
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value.trim()); // trim enlève les espaces au début/fin
    }, 400);

    // Si l’utilisateur tape encore avant 400ms, on annule le précédent délai
    return () => clearTimeout(timeout);
  }, [value]); // effet relancé chaque fois que "value" change

  // L’affichage du champ de recherche
  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)} // met à jour "value" à chaque frappe
        placeholder={placeholder}
        className="border rounded px-2 py-1 flex-1"
      />
    </div>
  );
}