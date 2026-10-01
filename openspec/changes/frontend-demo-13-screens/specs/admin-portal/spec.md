# Spec Delta

## Purpose

Provides the admin demo path for school-wide overview, low-score attention, class list with extrema, and ranking boards for class averages and individual scores.

## ADDED Requirements

### Requirement: School overview
The admin portal SHALL show a school overview with metric cards (student count, class count, today changes, average, high, low), a low-score attention section, and a class list showing each class average plus high/low scores.

#### Scenario: Enter admin overview
- **WHEN** the user enters as admin
- **THEN** the system shows the school overview (S09) populated from school-wide mock data

#### Scenario: Open class from list
- **WHEN** the admin taps a class row
- **THEN** the system navigates to a class detail view equivalent to the teacher ready home / board for that class using mock data

### Requirement: Class average ranking board
The admin portal SHALL provide a ranking board dimension for class average rank, with extremum cards, distribution chart with segment counts, and a ranked list of classes.

#### Scenario: View class average rank
- **WHEN** the admin opens 排名 with class-average dimension selected
- **THEN** the system shows the class average ranking board (S10)

### Requirement: Individual score ranking board
The admin portal SHALL allow switching the ranking dimension to individual student scores, including high-score list and low-score attention mode, with school-wide distribution counts.

#### Scenario: Switch to individual rank
- **WHEN** the admin switches ranking dimension to 个人分数
- **THEN** the system shows the individual ranking board (S10b) with mock students labeled by name and class

#### Scenario: Toggle low-score attention on individual board
- **WHEN** the admin selects 低分关注 on the individual board
- **THEN** the system lists students ordered by ascending score using mock data

### Requirement: Admin tab navigation
The admin portal SHALL expose bottom navigation among 总览, 排名, 班级, and a lightweight settings placeholder.

#### Scenario: Switch admin tabs
- **WHEN** the admin taps a bottom tab
- **THEN** the system shows the corresponding admin screen
