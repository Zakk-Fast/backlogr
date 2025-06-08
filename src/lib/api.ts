const apiUrl = import.meta.env.VITE_IGDB_PROXY_URL;

export async function searchGames(query: string) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}
