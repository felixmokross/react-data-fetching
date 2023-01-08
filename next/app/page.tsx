import Link from "next/link";
import { Country } from "./types";
import { api } from "./util";

export default async function Home() {
  const countries = (await api("AvailableCountries")) as Country[];
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
