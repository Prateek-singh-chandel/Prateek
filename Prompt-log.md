## [Date] - Task1
Goal:
Initialization

Prompt:
You are a senior software engineer focused on writing clean, efficient code.

Project:
Habit Tracker with Streak Logic
Tech: React (frontend), localStorage (primary), optional Node.js later

Core features:

* Add / delete habits
* Mark habit complete per day
* Correct streak calculation (based on consecutive dates)
* Basic progress (streak count, completion rate)

STRICT RULES:

1. Do NOT generate full files, full components, or large code blocks unless explicitly asked.
2. Maximum response length: short (prefer <150 words unless coding is requested).
3. Always ask what specific part to implement before writing code.
4. When coding is requested:

   * Output only the required function/component (no boilerplate unless asked)
   * No explanations unless requested
5. Prefer incremental development:

   * Step 1 → data model
   * Step 2 → core logic (streak)
   * Step 3 → UI pieces
   * Step 4 → storage
6. No assumptions — ask if unclear.
7. Avoid extra libraries unless necessary.
8. Optimize for correctness over features.

Interaction protocol:

* First response: ask what part to build (data model, streak logic, UI, or storage)
* Then proceed step-by-step based on my answers

Goal:
Produce minimal, correct, production-quality code in small steps.


Response Summary:
What part would you like to start with?

Data model — habit schema, storage shape
Streak logic — core calculation function
UI components — add/delete/complete interactions
Storage layer — localStorage read/write helpers

Result:
worked

## [Date] - Task2
Goal:
respond to query

Prompt:
Start with data model. Define minimal habit schema for React + localStorage.

Response Summary:
Key decisions:

completedDates as a sorted string array — simple, streak-friendly
ISO date strings (YYYY-MM-DD) — no time zones, easy comparison
No streak stored — always derived, never stale

Ready to move to streak logic?

Result:
worked

## [Date] - Task3
Goal:
strea

Prompt:
Proceed to streak logic.

Requirements:

* Implement a pure function: calculateStreak(completedDates: string[]): number
* Input: array of ISO dates (YYYY-MM-DD)
* Output: current streak count ending today

Constraints:

* Do not mutate input
* Handle unsorted arrays
* Ignore duplicate dates
* Correctly handle gaps (break streak)
* Use only native JS Date (no libraries)

Edge cases to cover:

* Empty array → 0
* No entry for today → 0
* Single date (today) → 1

Output format:

* Function only
* No explanation
* No extra code

Ask before proceeding further.


Response Summary:
function is generated.
What's next — UI components or storage layer?

Result:
worked

## [Date] - Task4
Goal:
Initialization

Prompt:
exact prompt you used

Response Summary:
what AI gave (short)

Result:
worked / partial / failed

## [Date] - Task5
Goal:
Initialization

Prompt:
exact prompt you used

Response Summary:
what AI gave (short)

Result:
worked / partial / failed