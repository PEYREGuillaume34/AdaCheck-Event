const Filter = ({ filters, onChange }) => {
  const handleFilterChange = (name, value) => {
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex space-x-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <select
        value={filters.price_type || ''}
        onChange={(e) => handleFilterChange('price_type', e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">Tous les prix</option>
        <option value="gratuit">Gratuit</option>
        <option value="payant">Payant</option>
      </select>

      <select
        value={filters.acces_type || ''}
        onChange={(e) => handleFilterChange('acces_type', e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">Tous les accès</option>
        <option value="non">Sans réservation</option>
        <option value="obligatoire">Réservation obligatoire</option>
        <option value="conseillée">Réservation conseillée</option>
      </select>
    </div>
  );
};

export default Filter;