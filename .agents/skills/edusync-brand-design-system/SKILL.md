---
name: edusync-brand-design-system
description: Authoritative guide and architectural governance for the EduSync Brand Design System and Authentication Flow. Enforces Figma 1:1 fidelity, Clean Architecture layering, design tokens, and custom widget maintenance. Use whenever creating, modifying, or auditing EduSync UI components, brand assets, or authentication flows.
---

# EduSync Brand Design System & Clean Architecture Governance

This skill is the authoritative standard for maintaining the **EduSync University Management System** brand identity, custom widget library, and system access flows. All code generated for this system must adhere to the patterns and tokens documented here.

---

## 1. Clean Architecture Standard

The system strictly enforces a 4-tier Clean Architecture:

```
src/
├── core/                                # Enterprise Domain Layer
│   ├── entities/                        # Business Models & Types (User, Session, OTP)
│   ├── errors/                          # Domain Errors (InvalidCredentials, SessionExpired)
│   └── repositories/                    # Repository Interfaces (IAuthRepository)
│
├── infrastructure/                      # Data & External Services Layer
│   ├── repositories/                    # Concrete Implementations (MockAuthRepository, ApiAuthRepository)
│   ├── services/                        # Domain Service Implementations (PasswordValidatorService)
│   └── storage/                         # Local/Session Storage Adapters
│
├── application/                         # Use Cases & Orchestration Layer
│   ├── state/                           # State Machine Context (AuthFlowContext)
│   ├── hooks/                           # Application Hooks (useAuthFlow, usePasswordStrength)
│   └── types/                           # Screen IDs & Action Contracts
│
└── presentation/                        # UI Presentation Layer
    ├── tokens/                          # CSS Custom Properties & TS Theme Constants
    ├── widgets/                         # Authoritative Custom Widgets (Figma Specimen)
    ├── layouts/                         # Architectural Layout Shells (AuthSplitLayout)
    ├── screens/                         # The 12 Canonical Auth Screens
    └── specimens/                       # Live Design System Specimen Gallery
```

### Architectural Invariants:
1. **Dependency Rule**: Dependencies point inward. `core` has zero framework or external UI dependencies.
2. **Interface Segregation**: `presentation` components communicate with data sources exclusively via repository interfaces or application use-case hooks.
3. **Widget Purity**: All interactive UI elements must derive from the authoritative custom widgets catalog (`presentation/widgets`). Never use unstyled raw HTML controls.

---

## 2. Design Tokens Reference

Ground truth values derived from Figma (`HI4ri4kWjNTQCUOTjhV5Zd`):

### Color System
| Token Name | Hex Value | Role |
| :--- | :--- | :--- |
| `--edusync-brand-navy` | `#14213D` | Left Brand Panel, high-contrast dark surfaces |
| `--edusync-brand-primary` | `#3659D9` | Brand Primary Blue, primary buttons, active links |
| `--edusync-brand-primary-hover` | `#2944B3` | Primary button hover state |
| `--edusync-brand-subtle` | `#EEF2FF` | Subtle blue badge backgrounds, active pill states |
| `--edusync-background-default` | `#F6F8FC` | Main application background |
| `--edusync-surface-default` | `#FFFFFF` | Form cards, inputs, dialog panels |
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
- **Heading H1**: 32px / 40px, Bold 700 (Screen Headers: "Welcome back", "Set a new password")
- **Heading H2**: 24px / 32px, SemiBold 600 (Section Headers, OTP digits)
- **Heading H4**: 18px / 28px, SemiBold 600 (School Identity Card Title)
- **Body Large**: 16px / 24px, Regular 400 (Screen Subtitles)
- **Body Default**: 14px / 20px, Regular 400 (Input Values, Card Paragraphs)
- **Body Small**: 12px / 18px, Regular 400 (Input Helper Texts, Footnotes)
- **Label Large**: 16px / 24px, Medium 500 (Primary Form Buttons)
- **Label Default**: 14px / 20px, Medium 500 (Form Field Labels)
- **Label Small**: 12px / 16px, Medium 500 (Badges, Pills)

### Elevations & Radii
- **Elevation 01 (Subtle)**: `0px 1px 3px 0px rgba(20, 33, 61, 0.06), 0px 1px 2px 0px rgba(20, 33, 61, 0.04)`
- **Elevation 02 (Medium)**: `0px 4px 12px 0px rgba(20, 33, 61, 0.08)`
- **Elevation 03 (Overlay)**: `0px 16px 40px 0px rgba(20, 33, 61, 0.16)`
- **Radius Sm**: `6px`
- **Radius Md**: `8px` (Inputs, Buttons, Alert Banners)
- **Radius Lg**: `12px` (Cards, Dialogs)
- **Radius Full**: `9999px` (Badges, Pills)

---

## 3. Authoritative Master Widgets Catalog

All UI components must be instantiated using the standardized widgets located in `src/presentation/widgets/`:

1. **`BrandLogo`** (`presentation/widgets/BrandLogo/BrandLogo.tsx`)
   - Incorporates the connected book SVG symbol and the "EduSync" wordmark.
   - Props: `variant?: 'on-dark' | 'on-light'`, `size?: 'sm' | 'md' | 'lg'`, `symbolOnly?: boolean`.
2. **`Button`** (`presentation/widgets/Button/Button.tsx`)
   - Variants: `primary`, `secondary`, `ghost`, `link`, `destructive`.
   - Sizes: `lg` (48px primary), `md` (40px), `sm` (32px).
   - Features built-in accessible SVG spinner for `isLoading={true}` state.
3. **`Input`** (`presentation/widgets/Input/Input.tsx`)
   - Supports top labels, leading/trailing icons, error indicators, helper text, and password toggle eye (`eye.svg` / `eye-off.svg`).
4. **`Checkbox`** (`presentation/widgets/Checkbox/Checkbox.tsx`)
   - 20x20 custom checkbox with SVG checkmark and `EduSync/Label/Default` typography.
5. **`Radio`** (`presentation/widgets/Radio/Radio.tsx`)
   - Custom radio control with 8px inner indicator dot.
6. **`Badge`** (`presentation/widgets/Badge/Badge.tsx`)
   - 28px height pill badge with optional leading icon (`info`, `success`, `warning`, `error`, `neutral`).
7. **`Card` & `SchoolContextCard`** (`presentation/widgets/Card/Card.tsx`)
   - Elevation-01 surface container with school branding, admin credentials notice, and authorized access badge.
8. **`Alert`** (`presentation/widgets/Alert/Alert.tsx`)
   - Status banners for system errors (`#FEF2F2`), session warnings (`#FFFBEB`), and success states.
9. **`ValidationMessage`** (`presentation/widgets/ValidationMessage/ValidationMessage.tsx`)
   - Inline feedback row combining status icon with small label text.
10. **`OTPInput`** (`presentation/widgets/OTPInput/OTPInput.tsx`)
    - 6-box numeric verification control with keyboard auto-advance, backspace handling, clipboard paste, and error highlights.
11. **`StepProgress`** (`presentation/widgets/StepProgress/StepProgress.tsx`)
    - 3-segment recovery flow progress indicator.
12. **`Dialog`** (`presentation/widgets/Dialog/Dialog.tsx`)
    - Modal overlay implementing Elevation 03 shadow and backdrop blur.
13. **`PasswordChecklist`** (`presentation/widgets/PasswordChecklist/PasswordChecklist.tsx`)
    - Requirement indicators: 8+ characters, uppercase letter, number or symbol.
14. **`Tabs`, `Table`, `Tooltip`, `Pagination`**
    - Authoritative specimen widgets from Figma node `0:1`.

---

## 4. Auth Flow State Machine (12 Figma Screens)

The authentication module models all 12 Figma screens (`node-id=4-425`):

| Screen ID | Title | Key State Characteristics |
| :--- | :--- | :--- |
| `01_ADMIN_LOGIN` | 01 Admin Login | Default entry. Email & password inputs, remember me, sign in button. |
| `02_FORGOT_PASSWORD` | 02 Forgot Password | Recovery step 1. Single email input, "Send verification code" CTA. |
| `03_OTP_VERIFICATION` | 03 OTP Verification | Recovery step 2. 6-digit OTP code, 48s resend countdown, "Verify code". |
| `04_RESET_PASSWORD` | 04 Reset Password | Recovery step 3. New password & confirm password with live requirements checklist. |
| `05_INVALID_LOGIN` | 05 Invalid Login State | Error alert banner: "Unable to sign in", red borders on inputs. |
| `06_SESSION_EXPIRED` | 06 Session Expired State | Amber session expiration notice, "Sign in again" CTA. |
| `07_LOGIN_LOADING` | 07 Login — Loading | Disabled inputs, primary button in loading state with active spinner. |
| `08_LOGIN_PASSWORD_VISIBLE` | 08 Login — Password Visible | Password unmasked ("MapleDemo24!"), eye-off toggle icon active. |
| `09_EMAIL_SENT` | 09 Forgot Password — Email Sent | Green confirmation banner: "Recovery request received", code instructions. |
| `10_OTP_INVALID_CODE` | 10 OTP — Invalid Code | 6 digit boxes in red error state, "That code is incorrect. Check the email and try again." |
| `11_RESET_VALIDATION_ERROR` | 11 Reset Password — Validation Error | Red borders, field error messages ("Passwords do not match"). |
| `12_RESET_SUCCESS` | 12 Reset Password — Success | Green circle-check icon, "Password reset complete", return to login CTA. |

---

## 5. Maintenance Checklist for Future Tasks

When extending or modifying the repository:
1. Always preserve Clean Architecture layers (`core` -> `infrastructure` -> `application` -> `presentation`).
2. Never hardcode colors; reference CSS variables (`var(--edusync-...)`) or `EDUSYNC_TOKENS`.
3. Use SVG icons from `/icons/` (`edusync-symbol.svg`, `school.svg`, `lock-keyhole.svg`, `eye.svg`, `circle-check.svg`, etc.).
4. Test both the **Auth Flow** (all 12 screens) and the **Custom Widgets Specimen** view to ensure zero visual or architectural regressions.
