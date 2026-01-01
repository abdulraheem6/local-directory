export default function ElectricianTemplate({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>Services: {data.services.join(", ")}</p>
    </div>
  );
}
