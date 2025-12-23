const BASE_URL =
  "https://chimera-ass1-default-rtdb.firebaseio.com/universes";

export async function fetchUniverse(universe) {
  const res = await fetch(`${BASE_URL}/${universe}/items.json`);
  return res.json();
}

export async function createUniverseItem(universe, data) {
  await fetch(`${BASE_URL}/${universe}/items.json`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
