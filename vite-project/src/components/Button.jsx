export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
    >
      {children}
    </button>
  );
}
