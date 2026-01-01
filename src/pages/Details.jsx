import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GroceryTemplate from "../templates/GroceryTemplate";
import ElectricianTemplate from "../templates/ElectricianTemplate";

export default function Details() {
  const { category, type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/details?category=${category}&type=${type}&id=${id}`)
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return "Loading...";

  if (type === "grocery") return <GroceryTemplate data={data} />;
  if (type === "electrician") return <ElectricianTemplate data={data} />;

  return null;
}
