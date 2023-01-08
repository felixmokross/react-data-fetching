export async function api(url: string) {
  const res = await fetch(`https://date.nager.at/api/v3/` + url);
  if (!res.ok) throw new Error("Failed to fetch API");

  const json = await res.json();
  return json;
}
