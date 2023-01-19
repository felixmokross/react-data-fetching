export async function get(url: string) {
  const res = await fetch(`https://date.nager.at/api/v3/${url}`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);

  return await res.json();
}
