# HR Insight Dashboard

## Presentation overview

The HR Insight Dashboard is a single-page interface for viewing key workforce information at a glance. It brings employee counts, team performance, attendance patterns, employee records, and job status into one clear workspace.

This version is a frontend demonstration. It uses local sample data and does not connect to an HR system, backend, database, or external service.

## How the page is organized

The desktop page has three visual areas:

1. **Sidebar** on the left for the studio identity, employee search, and dashboard section labels.
2. **Top bar** for the current location and quick actions.
3. **Dashboard content** for the page title, summary cards, charts, and employee information.

The content is arranged in two main rows. Team Performance and Attendance Report sit side by side; below them are the Employees table and Jobs Overview.

## Component guide

### Sidebar

The sidebar displays the Nosense Studio identity, a search field, dashboard section labels, and utility items at the bottom. Dashboard is highlighted in purple to show the current view.

The section labels are visual controls for this demo and do not open separate pages. The search field filters the employee table by employee name, email address, or ID.

**Files:** `src/components/Sidebar.jsx` and `src/components/Sidebar.css`

### Top bar

The top bar provides a simple breadcrumb—Dashboard / Overview—and two quick actions: Invite People and Generate Plan. Inviting a person opens a small form; Generate Plan displays a confirmation message.

**Files:** `src/components/TopBar.jsx` and `src/components/TopBar.css`

### Page heading and summary cards

The page heading introduces the dashboard and its purpose. Export Data downloads the employee sample records as a CSV file, while New Entry opens a form to add an employee to the local list.

Four summary cards make the most important figures easy to scan:

- **Total Employee:** 272
- **New Employee:** 72
- **Resign Employee:** 16
- **Job Applicants:** 329

Each card also shows a month-over-month percentage and a small icon.

### Team Performance

This line chart compares Project Team and Product Team performance from January through December. Purple represents the Project Team; orange represents the Product Team. A legend explains the colors, and hovering over the chart reveals values in a tooltip.

The Monthly and Yearly controls switch between two locally stored data sets, so the chart responds without a server connection.

### Attendance Report

The attendance panel uses a weekday-by-time heatmap. Monday through Friday appear along the bottom, while time labels run from 05:00 through 15:00. Lighter and darker purple cells provide a quick visual comparison of attendance intensity.

### Employees

The employee table displays sample employee IDs, names, email addresses, roles, departments, and status. Row checkboxes allow one or more employees to be selected, and the Employee ID heading sorts the list. Active status is shown in green.

On narrow screens, the table remains readable by scrolling horizontally within its panel.

### Jobs Overview

The semicircular chart summarizes 72 jobs: 46 Open, 18 Pending, and 8 Closed. Purple, orange, and green distinguish the categories, with a matching legend below the chart.

### Forms and notifications

Invite People and New Entry use lightweight modal forms. Actions such as adding an employee, generating a plan, exporting data, and clicking preview-only sidebar items provide a confirmation or status message without leaving the dashboard.

**Main dashboard components and sample data:** `src/App.jsx`  
**Dashboard layout and component styling:** `src/App.css`

## Visual style

The design aims to feel calm, professional, and easy to scan:

- **Purple** is the primary accent for active navigation, primary buttons, and chart emphasis.
- **Orange** differentiates the second performance series and Pending jobs.
- **Green** communicates positive change, active employee status, and Closed jobs.
- **Pale gray** forms the page background and supporting surfaces; panels are white with fine gray borders.
- **Dark gray text** provides readable contrast, while softer gray is reserved for supporting labels.
- **Rounded corners, subtle dividers, and restrained shadows** separate content without making the page feel crowded.

Typography follows a clear hierarchy: the dashboard title is the most prominent, panel headings are medium-weight, and chart labels or helper text are smaller and subdued. Components have been given extra height and spacing to improve readability while retaining the reference layout.

## Responsive behavior

On desktop, the sidebar stays beside the dashboard and the charts and detail panels share rows. On smaller screens, the sidebar becomes a compact horizontal header with a horizontally scrollable section menu. The charts and detail panels stack vertically, summary cards use two columns, and the employee table keeps its own horizontal scroll area.

## Suggested presentation script

> “This is the HR Insight Dashboard, a single-page view of sample workforce data. The summary cards provide a quick snapshot, while the performance chart and attendance heatmap reveal trends at a glance. The employee table supports search, selection, and sorting, and the jobs chart summarizes open, pending, and closed roles. Actions like inviting a teammate, adding a sample employee, and exporting the table are available directly on the page. The interface is responsive, and this demonstration runs entirely on local sample data.”

## Technical summary

- Built as a React application using JSX and JavaScript.
- Uses Vite for local development and production builds.
- Uses Recharts for charts and Lucide React for icons.
- Uses regular CSS files for layout, component styling, and responsive behavior.
- All displayed HR records are sample data held in the frontend.
