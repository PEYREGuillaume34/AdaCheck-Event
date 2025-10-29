// Button.jsx
export default function Button({ isToggled, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 text-sm"
    >
      {isToggled ? "Voir moins" : "Voir plus"}
    </button>
  );
}