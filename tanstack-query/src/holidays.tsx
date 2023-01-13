import { CountryInfo, PublicHoliday } from "./types";
import { api } from "./util";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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

export default function Countries() {
  const { countryCode } = useParams();
  if (!countryCode) throw new Error("No country code provided");

  const { data: country, status: countryStatus } = useQuery(
    countryInfoQuery(countryCode)
  );
  const { data: holidays, status: holidaysStatus } = useQuery(
    holidaysQuery(countryCode)
  );

  if (countryStatus === "error") throw new Error("Failed to load country");
  if (holidaysStatus === "error") throw new Error("Failed to load holidays");

  if (countryStatus === "loading") return <p>Loading country…</p>;

  return (
    <main>
      <h1>Holidays for {country.commonName}</h1>
      {holidaysStatus === "loading" ? (
        <p>Loading holidays…</p>
      ) : (
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
      )}
    </main>
  );
}
