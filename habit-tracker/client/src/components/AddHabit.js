import { useState } from 'react';

function AddHabit({ onAdd, loading }) {
  const [name, setName] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    await onAdd(trimmedName);
    setName('');
  }

  return (
    <form className="add-habit" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Add a new habit"
        aria-label="Add a new habit"
      />
      <button type="submit" disabled={loading || !name.trim()}>
        Add
      </button>
    </form>
  );
}

export default AddHabit;
