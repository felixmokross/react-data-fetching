import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Country } from "./types";
import { get } from "./util";

function countriesQuery() {
  return {
    queryKey: ["countries"],
    queryFn: async () => (await get("AvailableCountries")) as Country[],
  };
}

export function CountriesPage() {
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
