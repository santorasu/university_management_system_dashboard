---
name: edusync-brand-design-system
description: Authoritative guide and architectural governance for the EduSync Brand Design System, Authentication Flow, Admin Dashboard, Student Management, and Teacher Management. Enforces Figma 1:1 fidelity, Clean Architecture layering, design tokens, and custom widget maintenance. Use whenever creating, modifying, or auditing EduSync UI components, brand assets, authentication flows, dashboard views, or academic management modules.
---

# EduSync Brand Design System & Clean Architecture Governance

This skill is the authoritative standard for maintaining the **EduSync University Management System** brand identity, custom widget library, authentication access flows, interactive dashboard destinations, and academic student & teacher management modules. All code generated for this system must adhere to the patterns and tokens documented here.

---

## 1. Clean Architecture Standard

The system strictly enforces a 4-tier Clean Architecture:

```
src/
├── core/                                # Enterprise Domain Layer
│   ├── entities/                        # Business Models & Types (User, Session, Student, Teacher, DashboardDestination)
│   ├── errors/                          # Domain Errors (InvalidCredentials, SessionExpired)
│   └── repositories/                    # Repository Interfaces (IAuthRepository, IStudentRepository, ITeacherRepository)
│
├── infrastructure/                      # Data & External Services Layer
│   ├── repositories/                    # Concrete Implementations (MockAuthRepository, MockStudentRepository, MockTeacherRepository)
│   ├── services/                        # Domain Service Implementations (PasswordValidatorService)
│   └── storage/                         # Local/Session Storage Adapters
│
├── application/                         # Use Cases & Orchestration Layer
│   ├── state/                           # State Machine Contexts (AuthFlowContext, StudentFlowContext, TeacherFlowContext)
│   ├── hooks/                           # Application Hooks (useAuthFlow, useStudentFlow, useTeacherFlow)
│   └── types/                           # Screen IDs & Action Contracts
│
└── presentation/                        # UI Presentation Layer
    ├── tokens/                          # CSS Custom Properties & TS Theme Constants
    ├── widgets/                         # Authoritative Custom Widgets (Figma Specimen)
    ├── layouts/                         # Architectural Layout Shells (AuthSplitLayout, DashboardScreen)
    ├── screens/                         # Screens & Modules
    │   ├── auth/                        # The 12 Canonical Auth Screens
    │   ├── dashboard/                   # Main Dashboard Overview & 4 Destination Views
    │   ├── students/                    # Student Management Flow (Node 20:2104)
    │   └── teachers/                    # Teacher Management Flow (Node 21:876)
    │       ├── components/              # TeacherKpiCards, TeacherQuickProfile
    │       ├── ConsolidatedOverviewScreen.tsx # 21:877 (Split View)
    │       ├── TeacherDirectoryScreen.tsx     # 24:2998 (Full-Width Directory)
    │       ├── AddEditTeacherScreen.tsx       # 24:1826 (Add / Edit Form)
    │       ├── TeacherProfileScreen.tsx       # 24:2188 (Detailed Profile)
    │       └── TeacherFeedbackScreen.tsx      # 29:1320 (Feedback & Ratings)
    └── specimens/                       # Live Design System Specimen Gallery
```

### Architectural Invariants:
1. **Dependency Rule**: Dependencies point inward. `core` has zero framework or external UI dependencies.
2. **Interface Segregation**: `presentation` components communicate with data sources exclusively via repository interfaces or application use-case hooks.
3. **Widget Purity**: All interactive UI elements must derive from the authoritative custom widgets catalog (`presentation/widgets`). Never use unstyled raw HTML controls.
4. **TypeScript Strictness**: `verbatimModuleSyntax` requires explicit `import type { ... }`. `erasableSyntaxOnly` prohibits constructor parameter property declarations.

---

## 2. Design Tokens Reference

Ground truth values derived from Figma (`HI4ri4kWjNTQCUOTjhV5Zd`):

### Color System
| Token Name | Hex Value | Role |
| :--- | :--- | :--- |
| `--edusync-brand-navy` | `#14213D` | Left Brand Panel, Sidebar, high-contrast dark surfaces |
| `--edusync-brand-primary` | `#3659D9` | Brand Primary Blue, primary buttons, active links, charts |
| `--edusync-brand-primary-hover` | `#2944B3` | Primary button hover state |
| `--edusync-brand-subtle` | `#EEF2FF` | Subtle blue badge backgrounds, active pill states |
| `--edusync-background-default` | `#F6F8FC` | Main application background |
| `--edusync-surface-default` | `#FFFFFF` | Form cards, inputs, dialog panels, stat cards |
| `--edusync-surface-subtle` | `#F2F4F7` | Neutral badge fills, table headers, checklist containers |
| `--edusync-text-navy` | `#14213D` | H1, H4, and card titles |
| `--edusync-text-primary` | `#172033` | Input labels, body text, table cells |
| `--edusync-text-secondary` | `#667085` | Subtitles, helper texts, neutral labels |
| `--edusync-text-muted` | `#98A2B3` | Placeholders, disabled states |
| `--edusync-border-default` | `#E4E7EC` | Card borders, subtle dividers |
| `--edusync-border-strong` | `#D0D5DD` | Input borders, checkbox unchecked borders |
| `--edusync-status-success` | `#15803D` | Success messages, confirmed credentials |
| `--edusync-status-success-subtle` | `#F0FDF4` | Success validation fills |
| `--edusync-status-warning` | `#92400E` | Session expiration alert, warnings |
| `--edusync-status-warning-subtle` | `#FFFBEB` | Warning notice container background |
| `--edusync-status-error` | `#DC2626` | Error alert banners, validation highlights |
| `--edusync-status-error-subtle` | `#FEF2F2` | Error container background |

### Typography Scale (Inter Font Family)
- **Display**: 48px / 56px, Bold 700 (Brand Headline: "One School. One Connected System.")
- **Wordmark**: 44px, Bold 700, -0.0386em tracking ("EduSync")
- **Heading H1**: 32px / 40px, Bold 700 (Screen Headers: "Welcome back", "Dashboard", "Students", "Teachers")
- **Heading H2**: 24px / 32px, SemiBold 600 (Section Headers, Stat Card numbers, Teacher Names)
- **Heading H4**: 18px / 28px, SemiBold 600 (School Identity Card Title, Destination Titles)
- **Body Large**: 16px / 24px, Regular 400 (Screen Subtitles)
- **Body Default**: 14px / 20px, Regular 400 (Input Values, Card Paragraphs)
- **Body Small**: 12px / 18px, Regular 400 (Input Helper Texts, Footnotes)
- **Label Large**: 16px / 24px, Medium 500 (Primary Form Buttons)
- **Label Default**: 14px / 20px, Medium 500 (Form Field Labels, Table Headers)
- **Label Small**: 12px / 16px, Medium 500 (Badges, Pills, Subtitles)

### Elevations & Radii
- **Elevation 01 (Subtle)**: `0px 1px 3px 0px rgba(20, 33, 61, 0.06), 0px 1px 2px 0px rgba(20, 33, 61, 0.04)`
- **Elevation 02 (Medium)**: `0px 4px 12px 0px rgba(20, 33, 61, 0.08)`
- **Elevation 03 (Overlay)**: `0px 16px 40px 0px rgba(20, 33, 61, 0.16)`
- **Radius Sm**: `6px`
- **Radius Md**: `8px` (Inputs, Buttons, Alert Banners)
- **Radius Lg**: `12px` (Cards, Dialogs, Stat Cards)
- **Radius Full**: `9999px` (Badges, Pills)

---

## 3. Authoritative Master Widgets Catalog

All UI components must be instantiated using the standardized widgets located in `src/presentation/widgets/`:
1. `BrandLogo`, 2. `Button`, 3. `Input`, 4. `Checkbox`, 5. `Radio`, 6. `Badge`, 7. `Card` & `SchoolContextCard`, 8. `Alert`, 9. `ValidationMessage`, 10. `OTPInput`, 11. `StepProgress`, 12. `Dialog`, 13. `PasswordChecklist`, 14. `Tabs`, `Table`, `Tooltip`, `Pagination`, `Icon` (33 downloaded Figma SVG assets in `public/icons/`).

---

## 4. Auth Flow State Machine (12 Figma Screens)

The authentication module models all 12 Figma screens (`node-id=4-425`):
- `01_ADMIN_LOGIN`, `02_FORGOT_PASSWORD`, `03_OTP_VERIFICATION`, `04_RESET_PASSWORD`
- `05_INVALID_LOGIN`, `06_SESSION_EXPIRED`, `07_LOGIN_LOADING`, `08_LOGIN_PASSWORD_VISIBLE`
- `09_EMAIL_SENT`, `10_OTP_INVALID_CODE`, `11_RESET_VALIDATION_ERROR`, `12_RESET_SUCCESS`

---

## 5. Admin Dashboard Architecture (Figma Node `15:6394`)

- **Sidebar Navigation**: Maple Grove School identity, 4 grouped sections, active destination highlighting.
- **Top Header**: Global search, `2026-27 · Term 1` pill, notification counter `3`, `Alex Morgan` profile with timeout and sign-out simulation.
- **Overview Hero**: Breadcrumb trail, Fri 16 Oct date pill, Export report CTA.
- **5 KPI Stat Cards**: Students (1,248), Teachers (86), Classes & Subjects (42), Attendance (96.0%), Fees & Finance ($408,000). Clicking "Students" or "Teachers" navigates directly to their respective modules.
- **4 Destination Views**: `RECENT_ACTIVITIES`, `UPCOMING_EVENTS`, `ATTENDANCE_REPORT`, `FEES_FINANCE_REPORT`.

---

## 6. Student Management Flow Architecture (Figma Node `20:2104`)

Conforms 1:1 with Figma node `20:2104` across 4 canonical screens:
- `Consolidated Overview` (`#20:2105`): Split 2-column view with directory and quick student profile.
- `Student Directory` (`#24:2547`): Full-width 8-column table with multi-filters and pagination.
- `Add / Edit Student` (`#24:987`): 3-card enrollment form with validation.
- `Student Profile` (`#24:1354`): Comprehensive profile with academic & guardian summary.

---

## 7. Teacher Management Flow Architecture (Figma Node `21:876`)

The complete teacher management module conforms 1:1 with Figma node `21:876` across 5 canonical screens:

### Screen 1: `Teacher Management — Consolidated Overview` (`#21:877`)
- **Breadcrumbs**: `Dashboard / Teachers`
- **Actions**: `Back to directory` (secondary outline button -> `TEACHERS_DIRECTORY`), `Add teacher` (primary blue button -> `TEACHERS_ADD_EDIT`).
- **4 KPI Cards**: Total teachers (`86`, `+4 this academic year`), Active (`79`, `91.9% of faculty`), On leave (`4`, `Current leave records`), Subjects covered (`24`, `Across 12 grades`).
- **Split Layout (60% / 40%)**:
  - **Left Table**: Search input (`Search name, teacher ID, email...`), Department filter, Status filter, Interactive teacher rows with selection highlight border (`#3659D9`).
  - **Right Quick Profile**: Avatar with initials, Teacher ID & Department, Active pill, Contact info, Assigned classes & subjects pills, Availability status, Teacher Rating card (`4.8` ★★★★★ 126 reviews) with **"View feedback"** button, and Action buttons (`View timetable`, `Edit teacher`).

### Screen 2: `Teacher Management — Directory` (`#24:2998`)
- **Breadcrumbs**: `Dashboard / Teachers / Directory`
- **Actions**: `Teacher Feedback` button (navigates to `TEACHERS_FEEDBACK`), `Overview` button (navigates to `TEACHERS_CONSOLIDATED`), `Add teacher` (primary blue button -> `TEACHERS_ADD_EDIT`).
- **Full-Width Table**:
  - Filter bar: Search, Department, Status, Availability, Filters button, Export button.
  - Columns: Teacher (Avatar + Name), Teacher ID, Subjects, Classes, Employment, Availability badge, Status badge, Actions (`Edit` button).
  - Clicking teacher name opens `TEACHERS_PROFILE`. Clicking `Edit` opens `TEACHERS_ADD_EDIT`.

### Screen 3: `Teacher Management — Add Edit Teacher` (`#24:1826`)
- **Breadcrumbs**: `Dashboard / Teachers / Add / Edit`
- **Form Sections (3 Elevation-01 Cards)**:
  1. **Personal and contact information**: Full name *, Teacher ID *, Email address, Phone number, Address, Joining date.
  2. **Employment information**: Employment type dropdown, Department dropdown, Joining date, Qualification.
  3. **Teaching assignments and availability**: Assigned subjects *, Assigned classes *, Weekly teaching load, Availability dropdown.
- **Actions**: Helper notice, `Cancel` button, `Save teacher` button with validation & persistence.

### Screen 4: `Teacher Management — Teacher Profile` (`#24:2188`)
- **Breadcrumbs**: `Dashboard / Teachers / Profile`
- **Actions**: `Back to directory`, `Edit teacher`.
- **Hero Overview Card**: Circular avatar (64x64), Teacher name, Teacher ID, Department, Active badge, Email, Phone.
- **Two-Column Details Grid**:
  - Contact information: Email, Phone, Address, Emergency contact, Preferred contact.
  - Assigned classes & subjects: Subject pills, Class periods list (e.g. Grade 8 · A 4 periods/week).
- **Full-Width Card**: Employment & availability (Full-time details, experience, hours, `Available` pill).

### Screen 5: `Teacher Management — Feedback States` (`#29:1320`)
- **Breadcrumbs**: `Dashboard / Teachers / Feedback`
- **Action**: `Back to directory` button.
- **4 KPI Cards**: Total feedback (`248`), Average rating (`4.6 / 5`), New this month (`36`), Needs review (`12`).
- **Full-Width Table Card**:
  - Filter toolbar: Search, Teacher select, Rating select (5 stars, 4+ stars, 3+ stars), Status select (Published, New, Needs review), `Apply filters` button.
  - Columns: Student, Teacher, Rating (★★★★★ 5.0), Feedback text, Date, Status pill (`Published`, `New`, `Needs review`).

---

## 8. Academic Structure Architecture (Figma Node `29:1501`)

The complete academic structure & classes/subjects module conforms 1:1 with Figma node `29:1501` across 4 canonical screens:

### Screen 1: `Academic Structure — Overview` (`#29:1502`)
- **Breadcrumbs**: `Dashboard / Classes & Subjects / Overview` (interactive clickable trail).
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `← Dashboard` action button, and `+ Add class` primary CTA.
- **4 KPI Cards**: Academic years (`2`, `1 active`), Classes (`18`, `Grades 1–12`), Sections (`42`, `3 awaiting review`), Subjects (`24`, `6 departments`).
- **Sub-Navigation Tabs**: `Classes` (active), `Sections & Subjects`, `Academic Years`.
- **Filter Toolbar**: Search (`Search class or class teacher…`), Academic year dropdown (`2026–27`), Status dropdown (`All statuses`), `Filters` button.
- **Directory Table**: Columns for Class, Class teacher, Sections, Students, Capacity, Status pill, and Actions (`View details` -> navigates to Class Details).
- **Table Footer**: Pagination controls (`Showing 1–7 of 18 classes`, Previous, 1, 2, Next).

### Screen 2: `Academic Structure — Class Details` (`#29:1737`)
- **Breadcrumbs**: `Dashboard / Classes & Subjects / Class details`.
- **Navigation Triad**: Circular `←` back arrow returning to Overview, `← Back to classes` button, and `Edit class` primary action.
- **Class Hero Card**: Grade 8 title, Subtitle `Academic year 2026–27 · Middle school`, `Active` green badge, and 3 key metrics (`Students: 126 / 140`, `Sections: 4`, `Subjects: 9`).
- **Two-Column Split Grid**:
  - **Left Card (Sections & Capacity)**: Section A, B, C, D breakdown with assigned teacher, student counts, and capacity limits.
  - **Right Card (Subject-to-Teacher Assignments)**: Subjects taught (Mathematics, English, Science, Bangla, Computer Science) with assigned teachers and `Manage assignments` action.
- **Student Enrollment Card**: Subtitle `126 students enrolled · 14 seats available`, Search bar, Section filter (`All sections`, `A`, `B`, `C`, `D`), `+ Enroll students` modal CTA, and full enrollment table.

### Screen 3: `Academic Structure — Sections, Subjects & Assignments` (`#29:1956`)
- **Breadcrumbs**: `Dashboard / Classes & Subjects / Sections & subjects`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to classes` button, and `+ Add subject` primary CTA.
- **Sub-Navigation Tabs**: Interactive tab switcher with `Sections & Subjects` active.
- **Two-Column Split Grid**:
  - **Left Card (Sections)**: 42 sections overview (8A, 8B, 8C, 8D, 9A) with Class, Capacity, Teacher, and `Manage sections` button.
  - **Right Card (Subject Catalog)**: 24 subjects catalog (Mathematics `MTH-08`, English `ENG-08`, Science `SCI-08`, Bangla `BNG-08`, Computer Science `CSE-08`) with Department pills and Teacher.
- **Teacher & Subject Assignments Matrix**: Scoped assignments with search, Academic year, Class, and Section filters, `+ Assign teacher` action, and table showing Teacher, Subject, Class/Section, Weekly periods, and status pills (`Assigned` vs `Needs assignment`).

### Screen 4: `Academic Structure — Academic Years & Forms` (`#29:2207`)
- **Breadcrumbs**: `Dashboard / Classes & Subjects / Academic years`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to classes` button, and `+ Add academic year` CTA.
- **Sub-Navigation Tabs**: Interactive tab switcher with `Academic Years` active.
- **Academic Years Table**: Full configuration table for academic periods (2026–27 Active, 2025–26 Archived, 2027–28 Draft) with start/end dates, class counts, enrollment availability, and status pills.
- **Two-Column Split Grid**:
  - **Left Card (Create/Edit Form)**: Complete form for Academic year, Class name, Section name, Student capacity, Class teacher, Subject, Code, Department, helper validation note, `Cancel`, and `Save changes` actions.
  - **Right Card (Confirmation & Feedback States)**: Live specimen gallery of Archive Confirmation prompt (`Archive academic year 2025–26?`), Success toast alert (`Academic structure saved successfully`), Error toast alert (`Unable to save changes`), and Empty state callout (`No subjects assigned yet`).

---

## 9. Attendance Management Architecture (Figma Node `31:876`)

The complete student & class attendance module conforms 1:1 with Figma node `31:876` across 4 canonical screens:

### Screen 1: `Attendance — Overview` (`#31:877`)
- **Breadcrumbs**: `Dashboard / Attendance / Overview` (interactive clickable trail).
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `← Dashboard` action button, and `Take attendance` primary CTA.
- **4 KPI Cards**: Present today (`1,142`, `91.4% of students`), Absent (`76`, `6.1% of students`), Late (`31`, `2.5% of students`), Classes recorded (`38 / 42`, `4 pending`).
- **Sub-Navigation Tabs**: `Overview` (active), `Daily Records`, `Calendar & History`, `Notifications & States`.
- **Row 1 Split (60% / 40%)**:
  - **Left Card (Attendance Trend)**: October 2026 daily bar chart with rate values across days 1–12.
  - **Right Card (Status Distribution)**: Proportional progress meters for Present (`1,142`), Absent (`76`), Late (`31`), and Excused (`26`).
- **Row 2 Split (60% / 40%)**:
  - **Left Card (Class-wise Attendance)**: Classes sorted by lowest attendance first (Grade 8 A, Grade 7 B, Grade 9 A, Grade 6 C, Grade 10 B) with quick `Record` / `View` action links into Daily Records.
  - **Right Card (Absence Follow-ups)**: Urgent alerts for consecutive absences and unexcused leaves with `Review` CTAs and `View all notifications` link.

### Screen 2: `Attendance — Daily Records` (`#31:1145`)
- **Breadcrumbs**: `Dashboard / Attendance / Daily records`.
- **Navigation Triad**: Circular `←` back arrow returning to Overview, `← Back to overview` button, and `Save attendance` primary CTA.
- **Filter Toolbar**: Date picker (`18 October 2026`), Academic year (`2026–27`), Class (`Grade 8`), Section (`A`), Status filter (`All statuses`), `Apply filters` and `Reset`.
- **4 Quick Summary Chips**: Class total (`35`), Present (`32`), Absent (`2`), Late (`1`).
- **Student Attendance Marking Table**:
  - Columns: Student, Student ID, Roll, Status, Arrival, Remarks.
  - Interactive Status Picker: Immediate toggle buttons for `Present`, `Absent`, `Late`, and `Excused`. Modified rows highlight with green state.
  - Footer notice and actions: `Cancel changes` and `Save attendance` with feedback toast.

### Screen 3: `Attendance — Monthly Calendar & Student History` (`#31:1381`)
- **Breadcrumbs**: `Dashboard / Attendance / Calendar & history`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `Export report` primary CTA.
- **Top 60% / 40% Split**:
  - **Left Card (Monthly Calendar)**: October 2026 calendar grid for Grade 8 Section A with color-coded rate badges (94%+ High, 90–93% Moderate, <90% Needs review) across all 31 days.
  - **Right Card (Student Attendance History)**: Student selector dropdown (`Ava Thompson · STU-2026-001`), 4 metric summary boxes (Present 18 days, Absent 2 days, Late 1 day, Excused 1 day), and chronological recent records list.
- **Bottom Card (Class-wise Attendance Report)**: Daily average attendance overview for Grades 6 through 10 with Strong, Good, and Review pills.

### Screen 4: `Attendance — Absence Notifications & States` (`#31:1663`)
- **Breadcrumbs**: `Dashboard / Attendance / Notifications & states`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `Export records` CTA.
- **Top Card (Absence Notification Records)**: Multi-filter toolbar (Search, Notification type, Delivery status, Date range) and table with Student/Guardian, Trigger, Sent at, Channel pill (`Email`, `SMS`, `Push`), Delivery status pill (`Delivered`, `Failed`, `Queued`), and `Retry` / `View` actions.
- **Middle 3-Column System States**: Live specimen cards for `Loading state` (animated spinner), `Empty state` (icon + Clear filters CTA), and `Error state` (warning icon + Retry CTA).
- **Bottom Card (Validation & Confirmation States)**: Active confirmation prompt (`Submit attendance for Grade 8 · Section A?`) with `Cancel` and `Confirm` actions.

---

## 10. Timetable & Scheduling Architecture (Figma Node `40:1195`)

The complete timetable, periods scheduling and conflict detection module conforms 1:1 with Figma node `40:1195` across 4 canonical screens:

### Screen 1: `Timetable — Weekly Overview` (`#40:1196`)
- **Breadcrumbs**: `Dashboard / Timetable & Scheduling / Weekly Overview` (interactive clickable trail).
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `← Dashboard` action button, and `+ Create schedule` primary CTA.
- **Sub-Navigation Tabs**: Placed directly below the hero header for instant access (`Weekly Overview` active, `Daily View`, `Class & Teacher Views`, `Schedule Builder & Slots`).
- **4 KPI Cards**: Classes scheduled (`42`, `Across 6 days`), Teachers assigned (`28`, `2 periods to assign`), Rooms in use (`16`, `4 rooms available`), Schedule conflicts (`2`, `Needs review`).
- **Filter Toolbar**: Date range (`12–17 October 2026`), Academic year (`2026–2027`), Class (`Class 8`), Section (`Section A`), Teacher (`All teachers`), Day (`All days`).
- **Split Layout (70% / 30%)**:
  - **Left Card (Weekly Timetable Grid)**: Time rows (08:00 to 13:00) against Monday through Saturday columns. Color-coded slot cards by type: Class (blue), Lab (teal), Exam (amber), Event/holiday (purple). Clicking any block selects it for inspection.
  - **Right Card (Upcoming Schedule)**: Realtime events feed with times, subjects/meetings, and room locations (`View all events` CTA).

### Screen 2: `Timetable — Daily View` (`#40:1452`)
- **Breadcrumbs**: `Dashboard / Timetable & Scheduling / Daily View`.
- **Navigation Triad**: Circular `←` back arrow returning to Overview, `← Back to overview` button, and `+ Create schedule` primary CTA.
- **4 Daily Metric Cards**: Total periods (`48`, `Across 8 time slots`), Assigned (`44`, `92% covered`), Free rooms (`4`, `Available today`), Conflicts (`1`, `Teacher overlap`).
- **Conflict Warning Banner**: Active dismissal callout (`Science · Class 7B overlaps with another assignment for Maliha Noor at 09:40 AM.`) with `Review conflict` CTA.
- **Daily Periods Schedule Table**:
  - Columns: TIME, CLASS / SECTION, SUBJECT, TEACHER, ROOM, STATUS, ACTION.
  - Status pills: `Assigned` (green), `Conflict` (red), `Unassigned` (amber) with quick `Edit` / `Review` / `Assign` actions.

### Screen 3: `Timetable — Class & Teacher Views` (`#40:1688`)
- **Breadcrumbs**: `Dashboard / Timetable & Scheduling / Class & Teacher Views`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `+ Assign subject` primary CTA.
- **Segmented Control**: Toggle between `Class view` and `Teacher view` with quick class/teacher dropdown filters.
- **Split Layout (65% / 35%)**:
  - **Left Card (Schedule Grid)**: Monday through Friday periods matrix for selected class/teacher.
  - **Right Stack**:
    - `Selected assignment`: Inspects active slot (Subject, Teacher, Classroom, Time, with `Edit assignment` and `Remove` actions).
    - `Teacher workload overview`: Workload tally for Nusrat Jahan (18 periods/wk), Farhan Ahmed (16 periods/wk), Maliha Noor (22 periods/wk).
    - `Room availability`: Status indicators for Room 204 (Occupied - Busy), Room 105 (Available - Free), Lab 02 (Occupied - Busy).

### Screen 4: `Timetable — Schedule Builder & Time Slots` (`#40:1921`)
- **Breadcrumbs**: `Dashboard / Timetable & Scheduling / Schedule Builder`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `+ New schedule` CTA.
- **Two-Column Split Grid**:
  - **Left Card (Period Details Form)**: Comprehensive builder for Subject, Teacher, Classroom, Day, Start/End time, Period label, and recurring day toggles (`Mon`, `Tue    - `Upcoming schedule`: Compact chronological upcoming events preview.

---

## 11. Assignments & Class Materials Architecture (Figma Node `48:1320`)

The complete assignments, coursework tracking, and class learning resources module conforms 1:1 with Figma node `48:1320` across 4 canonical screens:

### Screen 1: `Assignments — Overview` (`#48:1321`)
- **Breadcrumbs**: `Dashboard / Assignments / Overview` (interactive clickable trail with circular back arrow).
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `← Dashboard` action button, and `＋ Create assignment` primary CTA.
- **Sub-Navigation Tabs**: Placed directly below the hero header for instant access (`Overview` active, `Assignment List`, `Create Assignment`, `Submissions & Materials`).
- **4 KPI Cards**: Placed directly beneath the tabs with 4px vertical accent bars:
  - Total assignments: `248` (blue accent `#3659D9`), `Across all active classes`
  - Published: `186` (green accent `#148C57`), `Visible to students`
  - Pending submissions: `74` (amber accent `#B86E0F`), `Awaiting student work`
  - Needs grading: `32` (purple accent `#6B4AB8`), `Submissions to review`
- **Main Grid (65% / 35% Split)**:
  - **Left Card (Recent assignments)**: Latest coursework table (Algebra — Worksheet 04, Chapter 3 Reading, Science Lab Report, English Essay) with class, due date, status pill (`Published`, `Draft`, `Late`), and submissions counter. Clicking any row selects and inspects the assignment.
  - **Right Card (Submission status)**: Proportional status tally with color dots: Submitted (`412`), Pending (`74`), Late (`26`), Graded (`356`).
- **Quick Action Cards Grid (Manage coursework)**:
  - `Assignment list`: "Search, filter, and review assignments" -> `Open →` (navigates to List & Details).
  - `Create assignment`: "Set class, subject, deadlines, and attachments" -> `Open →` (navigates to Create & Edit).
  - `Submission tracking`: "Review submitted, pending, and late work" -> `Open →` (navigates to Submissions & Materials).
  - `Class materials`: "Manage files and learning resources" -> `Open →` (navigates to Class materials tab).

### Screen 2: `Assignments — List and Details` (`#48:1535`)
- **Breadcrumbs**: `Dashboard / Assignments / Assignment list`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `＋ Create assignment` primary CTA.
- **Filter Toolbar Card**: Multi-filter toolbar for Search (`Search title or keyword`), Class (`All classes`, `Class 8-A`, `Class 7-B`, etc.), Subject (`All subjects`, `Mathematics`, `English`, etc.), Status (`All statuses`, `Published`, `Draft`, `Late`), Due date (`Any date`), and `Reset` button.
- **Assignment List Table Card**: Full-width interactive table with ASSIGNMENT, CLASS / SECTION, SUBJECT, TEACHER, DUE DATE, STATUS, SUBMISSIONS. Selecting a row highlights the row and loads details into the inspector card.
- **Selected Assignment Details Card**:
  - Assignment Title & Status Badge (`Algebra — Worksheet 04` · `Published`).
  - Full instructions text.
  - 2-row metadata grid: Class / Section (`Class 8 • Section A`), Subject (`Mathematics`), Assigned teacher (`Nusrat Jahan`), Published (`15 Oct 2026`), Due date (`22 Oct 2026 · 11:59 PM`), Attachments (`Worksheet_04.pdf · 2.4 MB`).
  - Actions: `Edit assignment` (opens edit form) and `View submissions` (opens submissions view filtered to this coursework).

### Screen 3: `Assignments — Create and Edit` (`#48:1747`)
- **Breadcrumbs**: `Dashboard / Assignments / Create assignment` (or Edit assignment).
- **Navigation Triad**: Circular `←` back arrow returning to List, `Save draft` button, and `Publish` primary action.
- **Form Layout (Two Columns: 65% / 35%)**:
  - **Left Card (Assignment details)**: Title, Academic year, Class dropdown, Section dropdown, Subject dropdown, Assigned teacher, Due date, Due time, Instructions textarea, Maximum marks, Submission type (`File upload`, `Online text`, `Physical paper`), Late submission policy (`Allow with late label`, `Reject late submissions`, `Penalty per day`).
  - **Right Stack**:
    - `Attachments & resources`: Drag-and-drop / click upload box (`PDF, DOCX, PPTX, JPG · up to 20 MB`), attached files list with remove `✕` action.
    - `Publishing options`: Custom checkboxes for "Visible to selected class", "Notify students", and "Allow resubmission".
- **Bottom Helper & Preview Cards**:
  - `Before publishing` validation helper card with `Required fields` badge.
  - `Student-facing preview` live rendering of assignment title, class, subject, deadline, max marks, and `Draft preview` badge.
  - Bottom actions: `Cancel`, `Save draft`, `Publish assignment` / `Save changes`.

### Screen 4: `Assignments — Submissions and Materials` (`#48:1939`)
- **Breadcrumbs**: `Dashboard / Assignments / Submissions & Materials`.
- **Navigation Triad**: Circular `←` back arrow, `← Back to overview` button, and `＋ Add material` primary CTA.
- **Inner Section Tabs**: Sub-tabs for `Submissions` (active), `Grading overview`, and `Class materials`.
- **Filter Toolbar Card**: Assignment selector, Class/Section filter, Status filter, Student search, and `Export` action.
- **Student Submissions Table Card**: Columns for STUDENT, SUBMITTED AT, FILE / RESOURCE, STATUS, MARKS, REVIEW.
  - Interactive rows: Ayesha Rahman, Tanvir Hossain, Nabila Islam, Samiul Karim.
  - Action buttons: `Open submission` (opens grading modal), `View grade`, `Send reminder` (notifies pending student).
- **Bottom Split Grid (50% / 50%)**:
  - **Left Card (Grading overview)**: Proportional progress bars for Awaiting review (`12`), Graded (`12`), Returned for revision (`2`), and `Average score: 16.4 / 20`.
  - **Right Card (Class materials library)**: Resources table for Class 8-A with Resource title, Type badge (`PDF`, `Link`), Updated date, and `Open` action + `＋ Add material` modal trigger.

---

---

## 12. Exams & Results Architecture (Figma Node `51:1320`)

The complete Exams & Results module conforms 1:1 with Figma node `51:1320` across 4 canonical screens:

### Screen 1: `Exams — Overview` (`#51:1321`)
- **Breadcrumbs**: `Dashboard / Exams & Results`.
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `← Dashboard` secondary button, and `＋ Create exam` primary CTA.
- **Module Navigation Tabs**: Pinned directly below hero: `Overview`, `Create & Schedule`, `Marks Entry & Review`, `Results & Report Cards`.
- **4 KPI Stat Cards** (with left vertical accent bars):
  - Total exams: `18` ("Across academic terms", primary blue bar)
  - Scheduled: `06` ("Upcoming assessments", amber bar)
  - Marks under review: `04` ("Teacher submissions pending", purple bar)
  - Published results: `12` ("Completed exam cycles", green bar)
- **Middle Row (Split Grid: 60% / 40%)**:
  - **Left (Upcoming exams card)**: Table with EXAM, TERM, DATE, STATUS, CLASSES, ACTION (`Mid-Term Examination`, `Class Test — Science`, `Final Assessment`, `Term 1 Final`).
  - **Right Stack**:
    - `Result processing`: Progress bars for Schedules confirmed (`8 / 8`), Marks submitted (`6 / 8`), Marks reviewed (`4 / 8`), Results published (`0 / 8`).
    - `Common actions`: Quick action tiles for Create exam, Enter marks, Review results, and Grading scale settings.
- **Bottom Card (Recent exam history)**: Table with EXAM, TERM, CLASSES, COMPLETED, RESULT STATUS, ACTION (`Annual Examination 2026`, `Class 7 Assessment`).

### Screen 2: `Exams — Create and Schedule` (`#51:1551`)
- **Breadcrumbs**: `Dashboard / Exams & Results / Create & Schedule`.
- **Navigation Triad**: Circular `←` back arrow returning to Overview, `Save draft` button, and `Schedule exam` primary action.
- **Form Layout (Two Columns: 65% / 35%)**:
  - **Left Column**:
    - `Exam information`: Exam name, Exam type dropdown (`Mid-Term`, `Final Exam`, `Class Test`, `Diagnostic Quiz`), Academic year, Term, Start & End dates, Applicable classes, Subjects, Exam instructions textarea.
    - `Subject schedule`: Interactive table with SUBJECT, DATE, TIME, ROOM, ACTION + `＋ Add subject schedule` inline creator.
  - **Right Stack**:
    - `Validation checklist`: Real-time validation for Exam parameters, class/subject selection, and non-overlapping schedules.
    - `Confirmation preview`: "Schedule this exam? Teachers will be notified when schedule is published." with Confirm/Cancel.
    - `System feedback states`: Specimen alerts for Success (Exam scheduled), Error (Date conflict), Warning (Missing subject).

### Screen 3: `Exams — Marks Entry and Review` (`#51:1756`)
- **Breadcrumbs**: `Dashboard / Exams & Results / Marks Entry & Review`.
- **Navigation Triad**: Circular `←` back arrow, `Under Review` status badge, `← Back to overview`, and `⚙️ Grading configuration` button.
- **Marks Filter Bar Card**: Exam, Class/Section, Subject, Teacher review status filters with Apply/Reset.
- **Teacher-submitted marks Card**: Table with CLASS/SUBJECT, TEACHER, SUBMITTED, MARKS, VALIDATION (`Valid`, `2 missing`, `Not submitted`), STATUS (`Submitted`, `Under Review`, `Pending`), ACTION (`Review & Approve`, `Send reminder`).
- **Bottom Split Row (50% / 50%)**:
  - **Left (Marks entry overview)**: Student marks table for Class 8-A Mathematics with student name, roll, marks, validation (`Valid`, `Out of range`, `Missing`), and `Fix marks` / `Enter marks` / `Edit` triggers opening `EditMarkModal`.
  - **Right (Grading configuration)**: Grade scale table (`A+`, `A`, `B`, `C`, `D`, `F`) with score ranges, grade points, and `Approve selected marks` CTA.

### Screen 4: `Exams — Results and Report Cards` (`#51:1992`)
- **Breadcrumbs**: `Dashboard / Exams & Results / Results & Report Cards`.
- **Navigation Triad**: Circular `←` back arrow, `Calculate results` action button.
- **Inner Section Tabs**: Sub-tabs for `Results review` (active), `Report cards`, `Result history`.
- **Results Filter Bar Card**: Exam, Class, Result status, Student search.
- **Calculated Results Table Card**: STUDENT, ROLL, TOTAL (`432 / 500`), GRADE (`A+`), CLASS RANK (`1`), VALIDATION (`Valid`, `Marks missing`), RESULT STATUS (`Under Review`, `Blocked`, `Published`), ACTION (`View report card`, `Resolve issue`).
- **Middle Split Row (50% / 50%)**:
  - **Left (Class-wise performance)**: Class average (`76.4%`), Pass rate (`92%`), Marks verified (`87%`).
  - **Right (Result publication)**: Warning notice ("2 records require correction before publishing"), `Preview report cards`, and `Publish results` CTA opening `PublishConfirmationModal`.
- **Report cards & result history Card**: Table with EXAM/TERM, CLASS, PUBLISHED ON, REPORT CARDS, STATUS, ACTION.
- **Interactive Modals**:
  - `StudentReportCardModal`: Official student grade sheet with subject breakdown, total scores, GPA, rank, and PDF download.
  - `PublishConfirmationModal`: Guardian/student publication confirmation.
  - `GradingConfigModal`: Score range and GPA scale editor.
  - `EditMarkModal`: Single-student mark validator and updater.

---

## 13. Fees & Finance Architecture (Figma Node `53:1320`)

The complete Fees & Finance / Student Billing & Invoicing module conforms 1:1 with Figma node `53:1320` across 4 canonical screens:

### Screen 1: `Fees — Finance Overview` (`#53:1321`)
- **Breadcrumbs**: `Dashboard / Fees & Finance / Overview`.
- **Navigation Triad**: Circular `←` back arrow returning to Dashboard, `+ Assign Fees` secondary action, and `Record Payment` primary CTA.
- **Module Navigation Tabs**: Pinned directly below hero: `Finance Overview`, `Categories & Assignment`, `Invoices & Payments`, `Dues & Reports`.
- **4 KPI Stat Cards** (with left vertical accent bars in standard sequence):
  - Total fees assigned: `৳ 48,50,000` ("Current academic year", primary blue `#3659D9` bar)
  - Collected so far: `৳ 36,72,500` ("75.7% collection rate", green `#148C57` bar)
  - Outstanding dues: `৳ 11,77,500` ("184 students with dues", amber `#B86E0F` bar)
  - Overdue balance: `৳ 3,26,000` ("62 payments overdue", red `#C23838` bar)
- **Middle Row (Split Grid: 65% / 35%)**:
  - **Left (Monthly Fee Collection Bar Chart)**: Academic Year 2026–27 collections in BDT (Jan through Aug bars with hover amount tooltips).
  - **Right (Payment Status Breakdown)**:
    - Paid: `৳ 36,72,500` (green dot, 75.7% progress)
    - Pending: `৳ 5,18,000` (amber dot, 10.7% progress)
    - Overdue: `৳ 3,26,000` (red dot, 6.7% progress)
    - Partially Paid: `৳ 1,33,500` (blue dot, 2.8% progress)
- **Recent Payments Table Card**: Student Name & ID, Invoice ID code pill, Date, Payment Method (bKash, Bank transfer, Cash), Amount, and Status badge (`Paid`, `Partially Paid`, `Overdue`, `Pending`), plus `View all →` linking to Invoices.
- **Bottom 4 Quick Action Cards**:
  - `Fee Categories`: Setup tuition, transport and term fees (`Open →`).
  - `Student Fee Assignment`: Assign fees to classes and students (`Open →`).
  - `Invoices & Payments`: Track and collect student payments (`Open →`).
  - `Dues & Receipts`: Manage outstanding dues and receipts (`Open →`).

### Screen 2: `Fees — Categories and Student Assignment` (`#53:1660`)
- **Breadcrumbs**: `Dashboard / Fees & Finance / Categories & Assignment`.
- **Navigation Triad**: Circular `←` back arrow returning to Overview, `+ Add Category` secondary button, and `Assign Fees to Class` primary CTA.
- **Split View (55% / 45%)**:
  - **Left (Active Fee Categories Table)**: Category name, Frequency (`Monthly`, `One-time`, `Per term`), Default Amount (Tuition ৳ 2,500, Admission ৳ 8,000, Exam ৳ 1,200, Transport ৳ 1,500, Lab & activity ৳ 2,000), and `Use in Batch` action.
  - **Right (Assign Fees to Class Form)**: Academic Year, Class & Section (`Class 8 · Section A`), Fee Category dropdown, Billing Period, Due Date, and Discount/Waiver input with `Assign Fee to Class (42 Students)` submit.
- **Bottom Card (Recent Student Fee Assignments)**: Table with Student, Class, Fee Head, Amount, Due Date, and Status badge (`Paid`, `Partially Paid`, `Overdue`, `Pending`).

### Screen 3: `Fees — Invoices and Payment Records` (`#53:1997`)
- **Breadcrumbs**: `Dashboard / Fees & Finance / Invoices & Payments`.
- **Navigation Triad**: Circular `←` back arrow, `+ New Invoice` button, and `Record Payment` CTA.
- **Search & Filter Toolbar**: Search query for Student name, ID or invoice, Status dropdown (`All`, `Paid`, `Partially Paid`, `Pending`, `Overdue`, `Payment failed`), and Billing Period.
- **Payment Alert Banner**: Highlights gateway failure for `INV-26-1007` (Sadia Akter · Class 7-B) with direct `Inspect Invoice →` button.
- **Split View (65% / 35% Inspector)**:
  - **Left (Invoice Directory Table)**: Invoice ID, Student Name & ID, Fee Head, Amount, Balance Due, and Status badge. Clicking any row selects the invoice in the inspector.
  - **Right (Selected Invoice Inspector Card - e.g. `INV-26-1042` Tanvir Hasan)**:
    - Code pill, student metadata, billing head, issue/due dates, last payment method.
    - Financial summary: Fee amount (`৳ 2,500`), Discount (`- ৳ 200`), Amount paid (`৳ 1,000`), Remaining Balance Due (`৳ 1,300`).
    - Actions: `Record Payment` (primary), `View Payment Slip`, `Download PDF Invoice ↓`.

### Screen 4: `Fees — Dues, Receipts and Reports` (`#53:2335`)
- **Breadcrumbs**: `Dashboard / Fees & Finance / Dues & Reports`.
- **Navigation Triad**: Circular `←` back arrow, `Send Dues Reminders` action, and `Export Audit Report` CTA.
- **4 Dues KPI Stat Cards**:
  - Outstanding invoices: `184` (amber `#B86E0F`)
  - Overdue invoices: `62` (red `#C23838`)
  - Discounts applied: `৳ 84,500` (purple `#6B4AB8`)
  - Receipts issued: `1,248` (green `#148C57`)
- **Split View (55% / 45%)**:
  - **Left (Outstanding & Overdue Invoices)**: Student, Fee Head, Due Date with days late highlight, Balance Due, and individual `Send SMS` trigger.
  - **Right (Official Payment Receipt Preview - `#RCP-2026-1248`)**: Authenticated slip with Maple Grove School heading, `PAID` stamp, Student details, Purpose, bKash method, Total Paid (`৳ 2,500`), Export PDF and Print Slip buttons.
- **Financial Reports & Statements Grid**: 4 download tiles:
  - `Collection Summary Report` (`Download CSV ↗`)
  - `Outstanding Dues Statement` (`Download PDF ↗`)
  - `Discounts & Scholarship Audit` (`Download Excel ↗`)
  - `Gateway Reconciliation` (`Download CSV ↗`)
- **Interactive Modals**:
  - `RecordPaymentModal`: Amount, payment method, date, transaction remarks with auto-updating balance and receipt generation.
  - `AddCategoryModal`: Category name, frequency, default amount, and description.
  - `AssignFeeModal`: Class-wide fee assignment batch processor.
  - `ReceiptModal`: Printable official school money receipt slip.

---

## 14. Universal Layout & Navigation Consistency Standards (Zero Deviation Governance)

To guarantee that the user never encounters layout discrepancies, inconsistent breadcrumbs, or non-matching components across modules, all present and future modules MUST enforce these non-negotiable rules:

### 1. Viewport & Symmetrical 2-Side Equal Padding Invariant (Image 1 Standard):
- The outer viewport wrapper (`.edusync-dashboard-content`) enforces:
  ```css
  padding: 24px 32px 48px;
  box-sizing: border-box;
  width: 100%;
  ```
- Every inner module container (`.academic-structure-container`, `.edusync-dash-overview`, `.edusync-teachers-view`, `.edusync-students-view`, `.attendance-container`, `.timetable-container`, `.assignments-container`, `.exams-container`, `.finance-container`) MUST strictly enforce:
  ```css
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 24px;
  box-sizing: border-box;
  ```
- **Equal 2-Side Padding**: The combination of `margin: 0 auto;` on a `max-width: 1400px` container inside a centered viewport ensures identical, symmetrical margins/padding on both left and right sides across any display width. Never allow containers to stretch unconstrained to viewport edges.

### 2. Standard Default Landing Layout (Image 1 Parity):
- Directory modules (Teachers, Students, Classes & Subjects) MUST land by default on the clean, full-width directory table screen (`TEACHERS_DIRECTORY`, `STUDENTS_DIRECTORY`, etc.).
- Never land on a compressed split-screen view by default. Users can toggle into split views (such as `Overview & Profile`) via the sub-navigation tabs.

### 3. Sub-Navigation Tabs Directly Beneath Hero (Persistent Tabbar Standard):
- Sub-navigation tabs (`.academic-nav-tabs`, `.edusync-nav-tabs`) must be placed directly beneath the Hero Header, maintaining a persistent vertical position across all sub-screens.
- The 4 KPI stat cards must be placed directly beneath the sub-navigation tabs, so when switching tabs, the tab bar remains stably pinned at the top without jumping.
- Active tabs must display the brand primary blue underline (`border-radius: 2px 2px 0 0; height: 2px; background: #3659D9; color: #3659D9; font-weight: 600;`).

### 4. 3-Layer Breadcrumb Standard:
- Breadcrumbs must follow exact 3-level hierarchy:
  `Dashboard / [Module Name] / [Current Screen Name]`
- Ancestor crumbs must be interactive link buttons (`.academic-hero__crumb--link` or `.edusync-dashboard-hero__crumb--link`).
- The active current crumb (`.academic-hero__crumb--current` or `.edusync-dashboard-hero__crumb--current`) must be **bold navy `#14213D`**.
- Separators must be subtle forward slashes `/` (`#D0D5DD` / `#98A2B3`).

### 5. Circular Back Navigation Arrow:
- Beside every module `<h1>` title, a circular button (`width: 36px; height: 36px; border-radius: 50%`) with `←` must be rendered.
- On sub-screens, clicking returns to the module's primary overview/directory; on the module overview, clicking returns to the Admin Dashboard.

### 6. 4 KPI Stat Cards Grid:
- When rendering summary metric cards, display a clean 4-column responsive grid (`repeat(4, 1fr)`) with card title, primary count, and status pill / subtext.

### 7. Filter Toolbar & Full-Width Data Cards:
- Position the filter toolbar (search input with icon, dropdown selects, and a `Filters` button) directly above the data card.
- Data tables must occupy 100% card width with clear column headers, status badges, and action buttons.

---

## 15. Next Steps & Feature Implementation Roadmap

1. **Step 1 (Completed)**: Brand Design System, Tokens, 18 Master Custom Widgets, and Specimen Gallery.
2. **Step 2 (Completed)**: 12-Screen Authentication Access Flow with state machine, mock latency, and error states.
3. **Step 3 (Completed)**: Admin Dashboard Overview (`15:6394`) and 4 destination views.
4. **Step 4 (Completed)**: Academics — Student Management Module (`20:2104` - 4 canonical screens).
5. **Step 5 (Completed)**: Academics — Teacher Management & Feedback Module (`21:876` - 5 canonical screens).
6. **Step 6 (Completed)**: Academics — Classes, Subjects & Academic Structure Module (`29:1501` - 4 canonical screens).
7. **Step 7 (Completed)**: Academics — Student & Class Attendance Module (`31:876` - 4 canonical screens).
8. **Step 8 (Completed)**: Academics — Timetable & Scheduling Module (`40:1195` - 4 canonical screens).
9. **Step 9 (Completed)**: Academics — Assignments & Class Materials Module (`48:1320` - 4 canonical screens).
10. **Step 10 (Completed)**: Academics — Exams & Results Module (`51:1320` - 4 canonical screens).
11. **Step 11 (Completed)**: **School Operations — Fees & Finance / Student Billing & Invoicing Module (`53:1320` - 4 canonical screens)**:
    - `Fees — Finance Overview` (`#53:1321`)
    - `Fees — Categories and Student Assignment` (`#53:1660`)
    - `Fees — Invoices and Payment Records` (`#53:1997`)
    - `Fees — Dues, Receipts and Reports` (`#53:2335`)
12. **Step 12 (Upcoming)**: **School Operations — Notices, Messages & Communications Module**.
