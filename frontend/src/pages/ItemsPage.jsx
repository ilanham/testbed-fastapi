import { useItems } from '../hooks/useItems'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

export default function ItemsPage() {
  const { items, loading, error, addItem, removeItem } = useItems()

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <main style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Items</h1>
      <ItemForm onSubmit={addItem} />
      <ItemList items={items} onDelete={removeItem} />
    </main>
  )
}
