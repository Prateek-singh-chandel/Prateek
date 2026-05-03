import HabitCard from './HabitCard';

function HabitList({ habits, onToggle, onDelete, togglingHabitId }) {
  if (habits.length === 0) {
    return <p className="empty-state">No habits yet. Add one to get started.</p>;
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          toggling={togglingHabitId === habit.id}
        />
      ))}
    </div>
  );
}

export default HabitList;
