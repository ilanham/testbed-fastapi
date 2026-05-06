import { useState } from 'react'

export default function ItemForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ name, description: description || null })
      setName('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Add Item'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
