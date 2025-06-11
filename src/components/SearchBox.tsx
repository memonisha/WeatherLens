'use client'

import { useState } from 'react'

interface Props {
  onSearch: (city: string) => void
  loading: boolean
}

export default function SearchBox({ onSearch, loading }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="px-4 py-2 rounded text-black w-60"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100 transition"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  )
}
