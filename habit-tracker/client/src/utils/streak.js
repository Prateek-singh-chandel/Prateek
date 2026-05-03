function normalizeDates(completedDates) {
  return [...new Set((completedDates || []).filter(Boolean))].sort();
}

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function diffInDays(later, earlier) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const laterDate = Date.UTC(later.getFullYear(), later.getMonth(), later.getDate());
  const earlierDate = Date.UTC(
    earlier.getFullYear(),
    earlier.getMonth(),
    earlier.getDate()
  );
  return Math.round((laterDate - earlierDate) / msPerDay);
}

function calculateStreak(completedDates) {
  const dates = normalizeDates(completedDates);
  const today = formatDate();

  if (!dates.includes(today)) {
    return 0;
  }

  let streak = 0;
  let cursor = parseDate(today);
  const completedSet = new Set(dates);

  while (completedSet.has(formatDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function calculateLongestStreak(completedDates) {
  const dates = normalizeDates(completedDates);

  if (dates.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let index = 1; index < dates.length; index += 1) {
    const previous = parseDate(dates[index - 1]);
    const currentDate = parseDate(dates[index]);

    if (diffInDays(currentDate, previous) === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

function calculateCompletionRate(completedDates, createdAt) {
  const dates = normalizeDates(completedDates);
  const uniqueCount = dates.length;
  const startDate = parseDate(createdAt);
  const today = parseDate(formatDate());
  const totalDays = diffInDays(today, startDate) + 1;

  if (!createdAt || Number.isNaN(startDate.getTime()) || totalDays <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((uniqueCount / totalDays) * 100));
}

export { calculateCompletionRate, calculateLongestStreak, calculateStreak };
