import { Link, useLoaderData } from "react-router-dom";
import { Country } from "./types";
import { get } from "./util";

export async function loader() {
  return (await get("AvailableCountries")) as Country[];
}

export default function CountriesPage() {
  const countries = useLoaderData() as Awaited<ReturnType<typeof loader>>;

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
