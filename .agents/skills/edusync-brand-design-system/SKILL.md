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

## 9. Next Steps & Feature Implementation Roadmap

Follow this step-by-step sequence for subsequent phases:

1. **Step 1 (Completed)**: Brand Design System, Tokens, 18 Master Custom Widgets, and Specimen Gallery.
2. **Step 2 (Completed)**: 12-Screen Authentication Access Flow with state machine, mock latency, and error states.
3. **Step 3 (Completed)**: Admin Dashboard Overview (`15:6394`) and 4 destination views (`Recent Activities`, `Upcoming Events`, `Attendance Report`, `Fees & Finance Report`).
4. **Step 4 (Completed)**: Academics — Student Management Module (`20:2104` - 4 canonical screens).
5. **Step 5 (Completed)**: Academics — Teacher Management & Feedback Module (`21:876` - 5 canonical screens).
6. **Step 6 (Completed)**: **Academics — Classes, Subjects & Academic Structure Module (`29:1501` - 4 canonical screens)**:
   - `Academic Structure Overview` (`#29:1502`)
   - `Class Details & Enrollment` (`#29:1737`)
   - `Sections, Subjects & Assignments` (`#29:1956`)
   - `Academic Years & Forms` (`#29:2207`)
7. **Step 7 (Upcoming)**: **Academics — Timetable & Exam Management**:
   - Class weekly timetable grid, midterm/final exam scheduler, and gradebook publication.
8. **Step 8 (Upcoming)**: **School Operations — Fees & Invoicing Module**:
   - Invoice generation, fee collection recording form, payment receipts, and automated reminder triggers.

---

## 10. Universal Flow Navigation & Breadcrumb Standard

To ensure users never get trapped and can effortlessly navigate back through complex flows, all modules and sub-screens must strictly follow this navigation triad:

1. **Interactive Breadcrumbs**:
   - Every sub-screen must render clickable ancestor crumbs (`.edusync-dashboard-hero__crumb--link`) with clear separators (`/`), hover underline/color change, and `role="button"`.
   - Clicking `Dashboard` returns to `OVERVIEW`. Clicking module roots (e.g. `Students` or `Teachers`) returns to their respective consolidated overviews.

2. **Circular Header Back Arrow (`.edusync-btn-back-circle`)**:
   - Every detail, form, or sub-view header must position a circular `←` button directly beside the `<h1>` title (e.g. `Student profile`, `Add student`, `Teacher profile`, `Teacher Feedback`).
   - Clicking this arrow immediately returns to the parent overview.

3. **Prominent Header Action Buttons**:
   - Top-right action bars must provide explicit secondary buttons (`← Back to students`, `← Back to teachers`, `← Back to Dashboard`, `Directory list`) alongside primary actions (`Edit`, `Save`, `Add`).
   - Forms (Add/Edit) must provide both top-bar back buttons and bottom-bar `Cancel` buttons.
