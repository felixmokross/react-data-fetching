import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const holidays = (await (
    await fetch("https://date.nager.at/api/v3/nextpublicholidays/ch")
  ).json()) as PublicHoliday[];

  return holidays;
}

export default function HolidaysPage() {
  const holidays = useLoaderData<typeof loader>();
  return (
    <ul>
      {holidays.map((h) => (
        <li key={h.name}>{h.name}</li>
      ))}
    </ul>
  );
}

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
