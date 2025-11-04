export default function Button({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
    >
      {children}
    </button>
  );
}
