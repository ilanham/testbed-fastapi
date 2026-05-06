import { useCallback, useEffect, useState } from 'react'
import { createItem, deleteItem, fetchItems } from '../api/items'

export function useItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItems(await fetchItems())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addItem = async (payload) => {
    const created = await createItem(payload)
    setItems((prev) => [created, ...prev])
    return created
  }

  const removeItem = async (id) => {
    await deleteItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return { items, loading, error, reload: load, addItem, removeItem }
}
