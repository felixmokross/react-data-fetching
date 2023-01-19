import Link from "next/link";
import { Country } from "./types";
import { get } from "./util";

export default async function CountriesPage() {
  const countries = (await get("AvailableCountries")) as Country[];
  return (
    <main>
      <ul>
        {countries.map((c) => (
          <li key={c.countryCode}>
            <Link href={`/${c.countryCode.toLocaleLowerCase()}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
