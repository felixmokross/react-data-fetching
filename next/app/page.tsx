import Link from "next/link";

type PublicHolidayType =
  | "Public"
  | "Bank"
  | "School"
  | "Authorities"
  | "Optional"
  | "Observance";

type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: PublicHolidayType[];
};

export default async function Home() {
  const publicHolidays = (await fetch(
    "https://date.nager.at/api/v3/nextpublicholidays/ch"
  ).then((res) => res.json())) as PublicHoliday[];
  return (
    <main>
      <ul>
        {publicHolidays.map((ph) => (
          <li key={ph.name}>{ph.name}</li>
        ))}
      </ul>
      <p>
        <Link href="other-page">Other page</Link>
      </p>
    </main>
  );
}
