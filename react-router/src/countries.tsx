import { Link, useLoaderData } from "react-router-dom";
import { Country } from "./types";
import { api } from "./util";

export async function loader() {
  return (await api("AvailableCountries")) as Country[];
}

export default function Countries() {
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
