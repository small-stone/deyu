# Spec Delta

## ADDED Requirements

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
