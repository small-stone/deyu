# teacher-portal Specification

## Purpose

Supports the teacher demo path: empty-state class setup and roster upload, ready class home, roster list, score adjust form, and class ranking board with mock data.

## Requirements

### Requirement: Empty-state create class
When the demo teacher has no class, the teacher portal SHALL show a create-class guide requiring a class code before other management features.

#### Scenario: Teacher with no class
- **WHEN** the demo teacher context is set to empty (no class)
- **THEN** the system shows the create-class screen (S05a) and MUST NOT present the ready class home as the primary entry

#### Scenario: Submit create class
- **WHEN** the teacher submits a class code (e.g. 352) on the create-class screen
- **THEN** the system advances to the upload-roster empty state for that class in local demo state

### Requirement: Empty-state upload roster
When the demo teacher has a class with zero students, the teacher portal SHALL show an upload-roster guide with import, manual add, and skip actions.

#### Scenario: Class with zero students
- **WHEN** the demo teacher has a class and student count is 0
- **THEN** the system shows the upload-roster screen (S05b)

#### Scenario: Skip upload
- **WHEN** the teacher chooses to skip roster upload
- **THEN** the system enters the ready class home in empty-student mode and score-adjust entry remains disabled or explains that students must be added first

#### Scenario: Import or manual add in demo
- **WHEN** the teacher completes import or manual add using demo actions
- **THEN** the system populates mock students and navigates to the ready class home

### Requirement: Ready class home
The teacher portal SHALL show a ready class home with class stats (average, today changes, high/low), attention list, and shortcuts to roster, score adjust, board, and search, using design mock figures for class 352 when seeded.

#### Scenario: Enter ready home with seeded data
- **WHEN** the teacher has class 352 with seeded students
- **THEN** the system shows home (S05) with mock stats including high 96 (林晓) and low -5 (王小明)

### Requirement: Roster management screen
The teacher portal SHALL provide a roster screen with upload zone UI, search field, student list (name, student number, score coloring), and add entry.

#### Scenario: Open roster
- **WHEN** the teacher opens 花名册
- **THEN** the system shows the roster screen (S06) with mock students including both high and negative scores

### Requirement: Score adjust screen
The teacher portal SHALL provide a score adjust flow: selected student, add/deduct mode, amount, required reason (with optional quick tags), and confirm that updates local demo score and log. The amount field SHALL accept positive numbers with **at most one decimal place** (e.g. 1.5); stored score and log delta MUST keep one-decimal precision.

#### Scenario: Submit deduct with reason
- **WHEN** the teacher selects a student, chooses deduct, enters an amount and a reason of at least 4 characters, and confirms
- **THEN** the system updates that student's local score, appends a score log, and shows success feedback

#### Scenario: Accept one-decimal amount
- **WHEN** the teacher enters an amount such as `1.5` in add or deduct mode and confirms with a valid reason
- **THEN** the system applies a delta of ±1.5 and updates the student score using one-decimal precision

#### Scenario: Block submit without reason
- **WHEN** the teacher attempts to confirm without a reason
- **THEN** the system MUST NOT apply the score change and prompts for a reason

### Requirement: Class ranking board
The teacher portal SHALL show a class board with extremum cards, score distribution bars with counts (including &lt;0 segment), and a ranked list with medal styling for top places.

#### Scenario: Open class board
- **WHEN** the teacher opens 看板
- **THEN** the system shows the class board (S08) driven by mock class students

### Requirement: Teacher tab navigation
The teacher portal SHALL expose bottom navigation among 本班, 学生, 看板, and a lightweight profile placeholder when in ready mode.

#### Scenario: Switch teacher tabs
- **WHEN** the teacher taps a bottom tab in ready mode
- **THEN** the system shows the corresponding teacher screen

### Requirement: Personal score color on the class board
The class board SHALL color each personal score numeral and its progress bar to match the distribution chart. A score below 40 MUST use the same orange as the &lt;0 and 0–40 segments. A score of 40 or above MUST use the same green as the upper segments.

#### Scenario: Score below 40 is orange
- **WHEN** a ranked student has a score below 40, including a negative score
- **THEN** that row's score numeral and progress bar are orange

#### Scenario: Score of 40 or above is green
- **WHEN** a ranked student has a score of 40 or above
- **THEN** that row's score numeral and progress bar are green

### Requirement: Fixed personal score bar scale
The class board SHALL size each personal score bar on a fixed 0–100 scale, where 100 points fills the track. A score of 0 or below MUST use only the shortest visible bar. The same score MUST have the same width on 高分榜 and 低分关注. A higher score MUST NOT have a shorter bar than a lower score.

#### Scenario: A low positive score stays short
- **WHEN** 低分关注 lists a student with 12 points next to students with negative scores
- **THEN** the 12-point bar is a short portion of the track and is not stretched to full width

#### Scenario: A more negative score is not longer
- **WHEN** the list contains both -8 and -5
- **THEN** the -8 bar is not longer than the -5 bar

#### Scenario: The same score keeps the same width
- **WHEN** the same student score is shown on 高分榜 and on 低分关注
- **THEN** both rows use the same bar width

### Requirement: Class board row opens student detail
Tapping a row on the class board 高分榜 or 低分关注 SHALL open a read-only detail for that student. The detail MUST show the student's name, class, current score, and add/deduct timeline. The tap MUST NOT open the score-adjust form.

#### Scenario: Tap a ranked student
- **WHEN** the teacher taps a ranking row on 高分榜 or 低分关注
- **THEN** the system opens that student's detail with name, class, current score, and score timeline

### Requirement: Demo boards for classes other than 352
Each seeded class other than 352 SHALL have its own demo roster and a non-empty five-segment score distribution. The class high and low names MUST be students on that roster. Class 352's seeded scores and distribution MUST stay unchanged.

#### Scenario: Open a class other than 352
- **WHEN** the class board is opened for 351, 443, 551, or 244
- **THEN** the board shows a populated distribution and multiple named students on both the high list and the low list
