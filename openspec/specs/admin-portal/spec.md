# admin-portal Specification

## Purpose

Provides the admin demo path for school-wide overview, low-score attention, class list with extrema, and ranking boards for class averages and individual scores.

## Requirements

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

### Requirement: Personal score color and scale on the school rank
The individual ranking board SHALL use the same personal score color and bar scale as the class board. A score below 40 MUST be orange, a score of 40 or above MUST be green, and bar width MUST use the fixed 0–100 scale. A score of 0 or below MUST use only the shortest visible bar, and a higher score MUST NOT have a shorter bar than a lower score.

#### Scenario: Low-score attention matches the shared scale
- **WHEN** the admin views 低分关注 containing scores -8, -5, and 12
- **THEN** each of those scores is orange, the 12-point bar is short rather than full, and the -8 bar is not longer than the -5 bar

#### Scenario: High scores stay green and long
- **WHEN** the admin views 高分榜 for a student scoring 90 or above
- **THEN** that row's numeral and bar are green, and the bar is near the full track

### Requirement: School ranking row opens the matching detail
Tapping a class-average rank row SHALL open that class's board. Tapping an individual rank row on 高分榜 or 低分关注 SHALL open that student's read-only detail, showing name, class, current score, and score timeline. Opening a class from the admin ranking MUST NOT change the teacher portal's current class.

#### Scenario: Tap a class rank row
- **WHEN** the admin taps a class on the class-average ranking
- **THEN** the system opens that class's board

#### Scenario: Tap a student rank row
- **WHEN** the admin taps a student on 高分榜 or 低分关注
- **THEN** the system opens that student's detail

#### Scenario: Teacher current class stays put
- **WHEN** the admin opens a class from the ranking or the class list
- **THEN** the teacher portal's current class is unchanged

### Requirement: School demo ranks beyond class 352
The school individual high list, low list, and overview low-attention list SHALL include students from more than one class and SHALL contain more rows than the previous three- or four-row samples. Each non-352 class card's high and low names MUST be students in that class. Class 352's seeded board figures MUST stay unchanged.

#### Scenario: Low-score list spans classes
- **WHEN** the admin opens 低分关注
- **THEN** the list shows more than three students and includes students from at least two classes

#### Scenario: A non-352 class card matches its roster
- **WHEN** the admin views 351, 443, 551, or 244 on the overview or class list
- **THEN** that class's high and low names are students who belong to that class

### Requirement: Class average bar color
A class-average progress bar SHALL use orange when that average is below 40, and green when it is 40 or above. Class-average bar length MAY stay proportional to the highest class average in the list.

#### Scenario: Class average below 40 is orange
- **WHEN** a class average on the ranking is below 40
- **THEN** that class row's average numeral and progress bar are orange
