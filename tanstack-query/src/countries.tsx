import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Country } from "./types";
import { api } from "./util";

function countriesQuery(): UseQueryOptions<Country[]> {
  return {
    queryKey: ["countries"],
    queryFn: async () => await api("AvailableCountries"),
  };
}

export default function Countries() {
  const { data: countries, status: countriesStatus } = useQuery(
    countriesQuery()
  );

  if (countriesStatus === "error") throw new Error("Failed to load countries");

  return (
    <main>
      {countriesStatus === "loading" ? (
        <p>Loading countries…</p>
      ) : (
        <ul>
          {countries.map((c) => (
            <li key={c.countryCode}>
              <Link to={c.countryCode.toLocaleLowerCase()}>{c.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
