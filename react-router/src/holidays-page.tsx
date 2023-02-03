import { CountryInfo, PublicHoliday } from "./types";
import { get } from "./util";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { format } from "date-fns";

export async function loader({ params }: LoaderFunctionArgs) {
  return (await Promise.all([
    get(`CountryInfo/${params.countryCode}`),
    get(`NextPublicHolidays/${params.countryCode}`),
  ])) as [CountryInfo, PublicHoliday[]];
}

export function HolidaysPage() {
  const [country, holidays] = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

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
