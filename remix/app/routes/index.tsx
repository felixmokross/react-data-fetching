import { Link, useLoaderData } from "@remix-run/react";
import type { Country } from "~/types";
import { api } from "~/util";

export async function loader() {
  return (await api("AvailableCountries")) as Country[];
}

export default function Index() {
  const countries = useLoaderData<typeof loader>();
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.countryCode}>
          <Link to={c.countryCode.toLocaleLowerCase()}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}
