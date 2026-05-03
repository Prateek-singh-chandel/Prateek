import {
  calculateCompletionRate,
  calculateLongestStreak,
  calculateStreak,
} from '../utils/streak';

function HabitCard({ habit, onToggle, onDelete, toggling }) {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const currentStreak = calculateStreak(habit.completedDates);
  const longestStreak = calculateLongestStreak(habit.completedDates);
  const completionRate = calculateCompletionRate(
    habit.completedDates,
    habit.createdAt
  );
  const isActive = currentStreak > 0;
  const todayChecked = habit.completedDates.includes(todayString);

  return (
    <article className={`habit-card ${isActive ? 'habit-card--active' : ''}`}>
      <div className="habit-card__header">
        <div>
          <h2>{habit.name}</h2>
          <p>Created {habit.createdAt}</p>
        </div>
        <button
          type="button"
          className="habit-card__delete"
          onClick={() => onDelete(habit.id)}
          aria-label={`Delete ${habit.name}`}
        >
          Delete
        </button>
      </div>

      <label className="habit-card__toggle">
        <input
          type="checkbox"
          checked={todayChecked}
          onChange={() => onToggle(habit.id)}
          disabled={toggling}
        />
        <span>Completed today</span>
      </label>

      <div className="habit-card__stats">
        <div>
          <strong>{currentStreak}</strong>
          <span>Current streak</span>
        </div>
        <div>
          <strong>{longestStreak}</strong>
          <span>Longest streak</span>
        </div>
        <div>
          <strong>{completionRate}%</strong>
          <span>Completion</span>
        </div>
      </div>
    </article>
  );
}

export default HabitCard;
