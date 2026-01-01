import { Link } from "react-router-dom";

export default function Results({ promoted, normal, filters }) {
  return (
    <>
      {promoted.length > 0 && (
        <>
          <h2>⭐ Sponsored</h2>
          {promoted.map(item => (
            <Card
              key={item.id}
              item={item}
              filters={filters}
              sponsored
            />
          ))}
        </>
      )}

      <h2>All Results</h2>
      {normal.map(item => (
        <Card
          key={item.id}
          item={item}
          filters={filters}
        />
      ))}
    </>
  );
}

// function Card({ item, filters, sponsored }) {
//   return (
//     <div style={{
//       border: sponsored ? "2px solid gold" : "1px solid #ccc",
//       padding: 10,
//       marginBottom: 10
//     }}>
//       {sponsored && <strong>Sponsored</strong>}
//       <h3>{item.name}</h3>
//       <p>{item.address}</p>

//       <Link
//         to={`/details/${filters.category}/${filters.type}/${item.id}`}
//       >
//         View Details
//       </Link>
//     </div>
//   );
// }

function Card({ item, filters, sponsored }) {
  return (
    <div style={{
      border: sponsored ? "2px solid gold" : "1px solid #ccc",
      padding: 10,
      marginBottom: 10
    }}>
      {sponsored && <strong>Sponsored</strong>}
      <h3>{item.name}</h3>
      <p>{item.address}</p>

      <Link
        to={`/details/${filters.state}/${filters.district}/${filters.mandal}/${filters.category}/${filters.type}/${item.id}`}
      >
        View Details
      </Link>
    </div>
  );
}