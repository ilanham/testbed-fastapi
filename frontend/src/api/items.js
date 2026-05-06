const BASE = '/api/items'

export async function fetchItems() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchItem(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function createItem(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function updateItem(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
}
