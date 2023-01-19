import { format } from "date-fns";
import { CountryInfo, PublicHoliday } from "../types";
import { get } from "../util";

type HolidaysPageProps = {
  params: { countryCode: string };
};

export default async function HolidaysPage({ params }: HolidaysPageProps) {
  const [country, holidays] = (await Promise.all([
    get(`CountryInfo/${params.countryCode}`),
    get(`NextPublicHolidays/${params.countryCode}`),
  ])) as [CountryInfo, PublicHoliday[]];
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
