import { CountryInfo, PublicHoliday } from "./types";
import { api } from "./util";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { QueryClient } from "@tanstack/react-query";

function countryInfoQuery(countryCode: string) {
  return {
    queryKey: ["countries", countryCode, "info"],
    queryFn: async () =>
      (await api(`CountryInfo/${countryCode}`)) as CountryInfo,
  };
}

function holidaysQuery(countryCode: string) {
  return {
    queryKey: ["countries", countryCode, "holidays"],
    queryFn: async () =>
      (await api(`NextPublicHolidays/${countryCode}`)) as PublicHoliday[],
  };
}

export function loader(queryClient: QueryClient) {
  return async function loader({
    params: { countryCode },
  }: LoaderFunctionArgs) {
    if (!countryCode) throw new Error("No country code provided");
    return await Promise.all([
      queryClient.ensureQueryData<CountryInfo>(countryInfoQuery(countryCode)),
      queryClient.ensureQueryData(holidaysQuery(countryCode)),
    ]);
  };
}

export default function Countries() {
  const [country, holidays] = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
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
