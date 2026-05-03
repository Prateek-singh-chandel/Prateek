const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function sortDatesAscending(dates) {
  return [...new Set(dates)].sort();
}

async function readHabits() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeHabits(habits) {
  await fs.writeFile(DATA_FILE, JSON.stringify(habits, null, 2));
}

app.get('/habits', async (_req, res) => {
  try {
    const habits = await readHabits();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load habits.' });
  }
});

app.post('/habits', async (req, res) => {
  try {
    const { name } = req.body || {};
    const trimmedName = typeof name === 'string' ? name.trim() : '';

    if (!trimmedName) {
      return res.status(400).json({ message: 'Habit name is required.' });
    }

    const habits = await readHabits();
    const newHabit = {
      id: randomUUID(),
      name: trimmedName,
      createdAt: formatDate(),
      completedDates: [],
    };

    habits.unshift(newHabit);
    await writeHabits(habits);

    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create habit.' });
  }
});

app.delete('/habits/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const habits = await readHabits();
    const nextHabits = habits.filter((habit) => habit.id !== id);

    if (nextHabits.length === habits.length) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    await writeHabits(nextHabits);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete habit.' });
  }
});

app.put('/habits/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const today = formatDate();
    const habits = await readHabits();
    const habitIndex = habits.findIndex((habit) => habit.id === id);

    if (habitIndex === -1) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    const habit = habits[habitIndex];
    const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
    const uniqueDates = sortDatesAscending(completedDates);
    const hasToday = uniqueDates.includes(today);

    habit.completedDates = hasToday
      ? uniqueDates.filter((date) => date !== today)
      : sortDatesAscending([...uniqueDates, today]);

    habits[habitIndex] = habit;
    await writeHabits(habits);

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle habit.' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Habit tracker server listening on http://localhost:${PORT}`);
});
