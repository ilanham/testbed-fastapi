export default function ItemList({ items, onDelete }) {
  if (items.length === 0) {
    return <p>No items yet.</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}
        >
          <strong>{item.name}</strong>
          {item.description && <span style={{ color: '#666' }}>{item.description}</span>}
          <button onClick={() => onDelete(item.id)} style={{ marginLeft: 'auto' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
