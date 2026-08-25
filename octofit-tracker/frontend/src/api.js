export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}