export default function Filters({ filters, setFilters }) {
  const update = (k, v) =>
    setFilters(prev => ({ ...prev, [k]: v }));

  return (
    <>
      <select onChange={e => update("state", e.target.value)}>
        <option value="">State</option>
        <option>Telangana</option>
      </select>

      <select onChange={e => update("district", e.target.value)}>
        <option value="">District</option>
        <option>Hyderabad</option>
      </select>

      <select onChange={e => update("mandal", e.target.value)}>
        <option value="">Mandal</option>
        <option>Kukatpally</option>
      </select>

      <select onChange={e => update("category", e.target.value)}>
        <option value="">Store / Service</option>
        <option value="stores">Store</option>
        <option value="services">Service</option>
      </select>

      <select onChange={e => update("type", e.target.value)}>
        <option value="">Type</option>
        <option value="grocery">Grocery</option>
        <option value="electrician">Electrician</option>
      </select>
    </>
  );
}
