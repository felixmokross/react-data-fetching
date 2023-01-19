import type { DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import type { CountryInfo } from "~/types";
import { get } from "~/util";

export async function loader({ params }: DataFunctionArgs) {
  return (await Promise.all([
    get(`CountryInfo/${params.countryCode}`),
    get(`NextPublicHolidays/${params.countryCode}`),
  ])) as [CountryInfo, PublicHoliday[]];
}

export default function HolidaysPage() {
  const [country, holidays] = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Holidays for {country.commonName}</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Local Name</th>
            <th>Counties</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((h) => (
            <tr key={`${h.date}-${h.name}`}>
              <td>{format(new Date(h.date), "dd MMM")}</td>
              <td>{h.name}</td>
              <td>{h.localName}</td>
              <td>{h.counties?.map((c) => c.split("-")[1]).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
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
