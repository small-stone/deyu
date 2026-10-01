# Spec Delta

## Purpose

Supports the teacher demo path: empty-state class setup and roster upload, ready class home, roster list, score adjust form, and class ranking board with mock data.

## ADDED Requirements

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
