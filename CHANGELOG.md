# Changelog

## [Unreleased]

## Fixed
- [OST-75] scope gamification_base_url inside js_extra Mako block

## 2.2.0 (2026-05-22)
## Fixed
- [OST-68] custom fonts loading from rg-branding-plugin
- use camelCase keys in leaderboard utils after API response conversion

## 2.1.0 (2026-03-13)
### Added

- Add fr-ca translations

## 2.0.0 (2025-08-07)
### Maintenance
- Update Author contact information
- Update Development Status classifier

### Breaking Changes

- [TEA-140] Make RGG Dashboard and Leaderboard brand aware
  - CSS variable key prefixes were changed from `--rgg-` to `--pgn-rgg-`.
    If your project or custom styles depend on these variables, you **must update the keys**.

    #### Example:

    ```diff
    - var(--rgg-accent-color)
    + var(--pgn-rgg-accent-color)

## Changed

- [NAU-478] Changed badge event titles
- [NAU-488] Added alert for empty leaderboard list
- [NAU-499] Changed badges counter value in section header
- [NAU-442, NAU-475] User config refactoring
- [NAU-433] Created points vault on the Performance page
- [NAU-358] Charts refactoring
- [NAU-407] Leaderboard page refactoring
- [NAU-404] Course leaderboard is implemented
- [NAU-397] Apply s2s requests for Avatars Config
- [NAU-357] Gamma leaderboard API version is updated
- [NAU-314] Translations refactoring
- [NAU-312] Change gamma-profile endpoint
- [NAU-298] Added avatar widget
- [NAU-298] Added React Query
- [NAU-170] Implement Course Leaderboard Toggle
- [NAU-153] Added optional parameter courseId to Leaderboard Page which handles API.
- Refactoring React application structure to align with best practices for improved maintainability and scalability.
- [NAU-130] Replace highcharts with echarts graphics.
- [NAU-113] DashboardPage component refactoring
  - Refactored API scripts, styles and Dashboard page components
- [NAU-120]: Refactored and replaced custom Leaderboard components with paragon components.
- [NAU-116] Replaced badge list modal window for Dashboard page.
- [NAU-116] Updated Feedback modal window.
- [NAU-115] Improved Badge Popup component.
- [NAU-115] Corrected styles for Dashboard modal and Badge popup.
- [NAU-114] Refactored Badge component.
- [NAU-114] Refactored Slider block.
- [NAU-118] Refactored charts components.
- [NAU-117] Refactored Progress Tracker block.
- [NAU-94] Created the SubHeader component.
- [NAU-94] Implemented Skip to main content hook.
- [NAU-94] Refactored scripts and styles.
- [NAU-95] Refactored the LogoDropdown component.
- [NAU-95] Improved accessibility for the LogoDropdown component.
- [NAU-95] Corrected styles.
- [NAU-95] Added tests.
- [NAU-105] Updated the Loader component.
- [NAU-105] Refactored the styles structure to improve organization and maintainability.
- [NAU-105] Enhanced the React components by restructuring and cleaning up the code.
- [NAU-105] Refactored tests.
- [NAU-93] Updated Paragon to the 22+ version.
- [NAU-93] Integrated stylelint and eslint using frontend-build configurations.
- [NAU-93] Introduced new Makefile commands: lint-js and lint-styles.
- [NAU-93] Added CI tasks to execute lint-js and lint-styles.
- [NAU-93] Resolved syntax issues in the React application.
- [NAU-56] Implement RGG Leaderboard toggle.
- [NAU-92] Refactor Leaderboard API.
- [NAU-83] Add course leaderboard tab to course home.

## Fixed
- [TEA-289] fixed custom fonts loading from rg-branding-plugin
- [NAU-510] fixed avatar card styles for mobile screens
- [NAU-405] Fixed messages for disabled Leaderboards pages
- [NAU-450] Corrected Leaderboard page title
- [NAU-450] Corrected Performance page title
- [NAU-240] Fix toggles separately working
- [NAU-184] Fix Course Leaderboard tab 500 error
- [NAU-168] fix responsive on the leaderboard page
- [NAU-139] fixed tooltip position on focus when progress at the beginning of status bar

## 1.3.1 (2025-02-13)
## Fixed
- fixed OOMKilled error for ReactUnits pipeline
- [RGG-997] fixed visual issue: block border, image alignments, responsive images and charts
- [RGG-997] added `.nvmrc`, replaced npm package `node-sass` with `sass`, fixed style issue caused build fail

## 1.3.0 (2023-11-16)
## Added
- [RGG-986] Django 4 support added

## Changed
- [RGG-986] Update the rg-toolkit requirement version to 0.2.0
- [RGOeX-26271] Update the rg-toolkit requirement version

## 1.2.2 (2023-11-16)
## Maintenance
- Add dist folder to the wheel package
- Add devbox for a local development

## 1.2.1 (2023-11-09)
## Fixed
- [RGG-975] fixed the issue with slider dots on mobile resolutions
- [RGG-974] fixed long status titles that were overlapping with other titles
- [RGG-973] fixed the status line and circles in the slider
- [RGG-971] fixed the font weight of subtitles on the Performance page
- [RGG-961] User see first page with statuses instead of page with last achieved status after login/refresh
- [RGG-972] current status toggle is displayed on status line incorrectly

## 1.2.0 (2023-11-02)
## Added
- [RGG-866] update Performance Board with the redesigned Level Chart
- [RGG-798] add Nix support for local development

## Changed
- [RGG-798] Update to NodeJS 18
- Update Docker image to python:3.10-bookworm

## Fixed
- [RGG-941] fix percentage progress calculation

## 1.1.0 (2023-06-08)
## Fixed
- [RGG-918] Fix popup close button hover and remove unnecessary border around the badges
- [RGG-919] Fix the error when retrieving system badges
- [RGG-921] Hotfix correct display of leaderboard page and performance page for an anonymous user
- [RGG-915] Hotfix for the leaderboard delimiter
- [RGG-917] Hotfix for the Feedback form submission

## Added
- [RGG-906] Added the RG Toolkit plugin as a requirement for RGG Dashboard
- [RGG-857] Added logo with dropdown and feedback form popup
- [RGG-789] The new design for displaying leaderboard has been implemented
- [RGG-882] The new design for displaying badges and statuses has been implemented
- [RGG-805] Added the 'signup_source' parameter when executing a request to obtain a leaderboard
- [RGG-820] Add the organisation-based filtering for the game_profile API
- [RGG-592] Completed events counter limit set

## 1.0.3 (2022-12-16)
## Tests
- [RGG-704] Add missing tests for gamma dashboard
- [RGG-704] add snapshots testing to some components
- [RGG-669] Add tests for RowBlockItemPopup
## Fixed
- [RGG-661] Visual problem for showing "Number" on the Progress Line
- [RGG-580] Status points on LMS "Performance" are displayed even if the user has no points

## 1.0.2 (2022-05-30)
- [RGG-566] Addopt dashboard/leaderboard template for Nutmeg

## 1.0.1 (2022-04-08)
- [RGOeX-1096] Add automatic pypi build and publish
- [RGOeX-1025] Fix achievement titles limit
- [RGOeX-1004] Update documentation
- [RGOeX-1033] Fix plot lines position for the status roadmap
- [RGOeX-472]  Add bundle.js to the repo

## 1.0 (2021-08-27)
- Support for Lilac release

## 0.0.9 (2020-10-27)
- [RGG-443] Fix cases with slashes for relative urls; fix tests data format
- [RGG-443] Build absolute urls from relative with RG_GAMIFICATION_ENDPOINT value
- [RGG-441] Fix status roadmap popup on dashboard padge
- [RGG-421] Responsive for gamma dashboard
- [RGG-439] Converted background close svg icon for popup
- [NICE-587] fix rendering of gamma leaderboard page

## 0.0.8 (2020-07-29)
- [RGG-432] Fix invalid status description on leaderboard
- [RGG-373] Improve LeaderboardTableRow logic & adapt tests.
- [RGG-369] Implement Dashboard page as a SPA application
- [RGG-421] Responsive for leaderboard

## 0.0.7 (2020-07-15)
- [RGG-390] add fixes for table row, compare with design

## 0.0.4 (2020-07-06)
- [RGG-304] Hide bages and add support bage counter
- [RGG-316] Styled leaderboard table header
