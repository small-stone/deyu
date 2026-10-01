# Spec Delta

## ADDED Requirements

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
