# parent-portal Specification

## Purpose

Lets parents browse bound children, use a bind-child form, and inspect score details with an add/deduct timeline using demo mock data.

## Requirements

### Requirement: Bound children home
The parent portal SHALL show a children home screen with child switcher chips, a prominent current score presentation (score ring), side stats (initial score, term delta, class rank), and a recent records preview matching design mock content.

#### Scenario: View default child
- **WHEN** the parent enters the portal with mock bindings present
- **THEN** the system shows the selected child (default 陈一诺) with score 86 and recent timeline preview items from mock data

#### Scenario: Switch child
- **WHEN** the parent taps another child chip (陈一然)
- **THEN** the system updates the score panel and recent records to that child's mock data

### Requirement: Bind child screen
The parent portal SHALL provide a bind-child form for student name and ID number, with a submit action that can update local demo state (no server validation required).

#### Scenario: Open bind from home
- **WHEN** the parent taps the bind entry (chip or tab)
- **THEN** the system shows the bind form (S03) with fields for name and ID number

#### Scenario: Submit bind in demo
- **WHEN** the parent submits the bind form with any non-empty name and ID-like input
- **THEN** the system shows success feedback and returns to children home with the new child available in the local demo list (or updates mock state equivalently)

### Requirement: Score timeline detail
The parent portal SHALL provide a full score timeline screen listing add/deduct records with time, delta, reason, and operator name from mock data.

#### Scenario: Open full timeline
- **WHEN** the parent taps "查看全部" or navigates to score detail
- **THEN** the system shows the timeline screen (S04) for the selected child with mock records in reverse chronological order

### Requirement: Parent tab navigation
The parent portal SHALL expose bottom navigation among children home, bind, and a lightweight profile placeholder.

#### Scenario: Switch parent tabs
- **WHEN** the parent taps a bottom tab
- **THEN** the system shows the corresponding parent screen without leaving the parent role
