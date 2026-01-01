import { useState } from "react";
import Filters from "../components/Filters";
import Results from "../components/Results";

export default function Home() {
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    mandal: "",
    category: "",
    type: ""
  });

  const [promoted, setPromoted] = useState([]);
  const [normal, setNormal] = useState([]);

  const ready = Object.values(filters).every(Boolean);

  const search = async () => {
    if (!ready) return;

    const params = new URLSearchParams(filters);
    const res = await fetch(`/api/stores?${params}`);
    const data = await res.json();

    setPromoted(data.promoted || []);
    setNormal(data.normal || []);
  };

  return (
    <div>
      <h1>Find Stores & Services</h1>

      <Filters filters={filters} setFilters={setFilters} />

      <button disabled={!ready} onClick={search}>
        Search
      </button>

      <Results
        promoted={promoted}
        normal={normal}
        filters={filters}
      />
    </div>
  );
}
