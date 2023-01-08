export type PublicHolidayType =
  | "Public"
  | "Bank"
  | "School"
  | "Authorities"
  | "Optional"
  | "Observance";

export type PublicHoliday = {
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

export type Country = {
  countryCode: string;
  name: string;
};

export type CountryInfo = {
  commonName: string;
};
