export default function GroceryTemplate({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.timings}</p>

      {data.images.map(img => (
        <img
          key={img}
          src={`/${img}`}
          width="300"
        />
      ))}
    </div>
  );
}
