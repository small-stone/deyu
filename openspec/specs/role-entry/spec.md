# role-entry Specification

## Purpose

Provides the welcome screen and demo role switcher so users can enter parent, teacher, or admin portals without authentication.

## Requirements

### Requirement: Role entry welcome screen
The system SHALL present a welcome screen branded as 德育通 with three selectable roles: parent, teacher, and admin.

#### Scenario: Open app lands on role entry
- **WHEN** the user opens the mini program with no active demo role selected
- **THEN** the system shows the welcome / role entry screen (S01)

#### Scenario: Select parent role
- **WHEN** the user taps "我是家长"
- **THEN** the system navigates into the parent portal home

#### Scenario: Select teacher role
- **WHEN** the user taps "我是班主任"
- **THEN** the system navigates into the teacher portal (ready class home when mock class exists)

#### Scenario: Select admin role
- **WHEN** the user taps "我是管理员"
- **THEN** the system navigates into the admin school overview

### Requirement: Switch role without login
The system SHALL allow returning to the role entry screen to switch demo roles without WeChat login or invitation-code verification.

#### Scenario: Return from placeholder profile
- **WHEN** the user opens the lightweight "我的/设置" placeholder and chooses to switch role
- **THEN** the system returns to the role entry screen and clears the previous demo role context for navigation purposes
