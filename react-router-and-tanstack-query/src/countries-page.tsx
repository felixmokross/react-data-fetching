import { QueryClient } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { Country } from "./types";
import { get } from "./util";

function countriesQuery() {
  return {
    queryKey: ["countries"],
    queryFn: async () => (await get("AvailableCountries")) as Country[],
  };
}

export function loader(queryClient: QueryClient) {
  return async function loader() {
    return queryClient.ensureQueryData(countriesQuery());
  };
}

export function CountriesPage() {
  const countries = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <main>
      <ul>
        {countries.map((c) => (
          <li key={c.countryCode}>
            <Link to={c.countryCode.toLocaleLowerCase()}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
