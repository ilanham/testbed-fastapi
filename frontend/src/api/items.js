const BASE = '/api/items'

async function request(url, options = {}) {
  let res
  try {
    res = await fetch(url, options)
  } catch (e) {
    throw new Error(`Network error — could not reach the API. (${e.message})`)
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '(no response body)')
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${body}`)
  }
  return res
}

export async function fetchItems() {
  const res = await request(`${BASE}/`)
  return res.json()
}

export async function fetchItem(id) {
  const res = await request(`${BASE}/${id}`)
  return res.json()
}

export async function createItem(payload) {
  const res = await request(`${BASE}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function updateItem(id, payload) {
  const res = await request(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function deleteItem(id) {
  await request(`${BASE}/${id}`, { method: 'DELETE' })
}
