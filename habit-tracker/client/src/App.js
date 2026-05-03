import { useEffect, useState } from 'react';
import AddHabit from './components/AddHabit';
import HabitList from './components/HabitList';
import './App.css';

function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [togglingHabitId, setTogglingHabitId] = useState(null);

  async function loadHabits() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/habits');

      if (!response.ok) {
        throw new Error('Failed to load habits.');
      }

      const data = await response.json();
      setHabits(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHabits();
  }, []);

  async function handleAddHabit(name) {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Failed to add habit.');
      }

      const newHabit = await response.json();
      setHabits((currentHabits) => [newHabit, ...currentHabits]);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteHabit(id) {
    const snapshot = habits;
    setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== id));
    setError('');

    try {
      const response = await fetch(`/habits/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to delete habit.');
      }
    } catch (err) {
      setHabits(snapshot);
      setError(err.message || 'Something went wrong.');
    }
  }

  async function handleToggleHabit(id) {
    const today = formatLocalDate();
    const snapshot = habits;
    setError('');
    setTogglingHabitId(id);

    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const completedDates = new Set(habit.completedDates || []);

        if (completedDates.has(today)) {
          completedDates.delete(today);
        } else {
          completedDates.add(today);
        }

        return {
          ...habit,
          completedDates: Array.from(completedDates).sort(),
        };
      })
    );

    try {
      const response = await fetch(`/habits/${id}/toggle`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update habit.');
      }

      const updatedHabit = await response.json();
      setHabits((currentHabits) =>
        currentHabits.map((habit) => (habit.id === id ? updatedHabit : habit))
      );
    } catch (err) {
      setHabits(snapshot);
      setError(err.message || 'Something went wrong.');
    } finally {
      setTogglingHabitId(null);
    }
  }

  return (
    <main className="app-shell">
      <section className="app-panel">
        <header className="app-header">
          <div>
            <p className="eyebrow">Habit Tracker</p>
            <h1>Build steady streaks, one day at a time.</h1>
          </div>
          <AddHabit onAdd={handleAddHabit} loading={saving} />
        </header>

        {error ? <div className="error-banner">{error}</div> : null}

        {loading ? (
          <p className="loading-state">Loading habits...</p>
        ) : (
          <HabitList
            habits={habits}
            onToggle={handleToggleHabit}
            onDelete={handleDeleteHabit}
            togglingHabitId={togglingHabitId}
          />
        )}
      </section>
    </main>
  );
}

export default App;
