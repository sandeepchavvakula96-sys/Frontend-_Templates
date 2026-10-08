# SohniHire — Modern Job Search UI Template Collection

> **UI Template Collection Hackathon · GitHub Team Collaboration**

SohniHire is a modern, responsive **Job Search Platform UI Template Collection** created with plain HTML, CSS and JavaScript. It demonstrates multiple emerging interface patterns across job discovery, dashboards, AI interfaces, analytics, resume building, and application tracking.

## Team

- **Team / Project:** SohniHire
- **Primary contributor:** Sohni
- **Other members:** Add your team members here

## Selected UI Topic

**Job Search Platform** — combining Modern SaaS, AI Interfaces, and Analytics & Data Visualization patterns.

## Topic Research

### 1. What is the UI pattern?

A job-search platform combines discovery interfaces (search, filters, recommendations), decision interfaces (job details and company profiles), workflow interfaces (applications and alerts), and career productivity tools (resume builder, analytics, AI assistant).

### 2. Where is it commonly used?

It is commonly used by job boards, recruitment platforms, company career sites, applicant tracking products, and career-management applications.

### 3. Why is it relevant to modern web interfaces?

Modern candidates expect fast search, personalized recommendations, clear application status, mobile-friendly experiences, and increasingly AI-assisted career guidance. The pattern also provides a rich example of reusable cards, dashboards, filters, timelines, data visualization, forms, and conversational UI.

### 4. Design / interaction patterns observed

- Search-first hero interfaces
- Multi-filter job discovery
- Job cards with compact metadata
- Sticky navigation and contextual actions
- Dashboard stat cards
- Application pipeline and timeline
- Progressive profile completion
- AI chat with suggested prompts
- Live resume preview
- Data visualization cards
- Dark/light theme switching
- Responsive layouts and micro-interactions
- Toast feedback for actions

### 5. What SohniHire does differently

SohniHire treats the job journey as a **connected design system**, rather than a single job-listing page. The collection contains ten templates sharing the same visual language:

1. Job Search Landing
2. Advanced Job Search
3. Job Details
4. Company Explorer
5. Company Details
6. Candidate Dashboard
7. Application Tracker
8. AI Career Assistant
9. Resume Builder
10. Career Analytics
11. Job Alert Center

The project also includes local demo state for saved jobs, a theme switcher, live resume editing, searchable job data, application-status interactions, AI prompt interactions, and responsive behavior.

## Folder Structure

```text
sohnihire/
├── index.html
├── README.md
├── pages/
│   ├── jobs.html
│   ├── job-details.html
│   ├── companies.html
│   ├── company-details.html
│   ├── dashboard.html
│   ├── applications.html
│   ├── saved-jobs.html
│   ├── ai-career-assistant.html
│   ├── resume-builder.html
│   ├── analytics.html
│   └── job-alerts.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── data.js
│   ├── app.js
│   ├── dashboard.js
│   ├── resume.js
│   └── ai-assistant.js
└── assets/
    ├── images/
    ├── icons/
    └── logos/
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- CSS Grid / Flexbox
- LocalStorage
- Responsive design
- No framework required
- No build step required

## How to Run

### Option 1 — Open directly

Open `index.html` in a modern browser.

### Option 2 — VS Code Live Server

1. Open the `sohnihire` folder in VS Code.
2. Install/use Live Server.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

## GitHub Collaboration Workflow

The hackathon requires:

```text
Fork
  ↓
Clone
  ↓
Branch
  ↓
Develop
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Code Review
  ↓
Changes if requested
  ↓
Approve
  ↓
Merge
```

### Example branches

```text
feature/sohni-landing
feature/job-search
feature/dashboard
feature/ai-career
feature/resume-builder
feature/company-pages
```

### Example commits

```text
feat: create SohniHire landing page
feat: add advanced job search filters
feat: build candidate analytics dashboard
feat: add AI career assistant interface
feat: add live resume builder
fix: improve mobile responsive layout
docs: add topic research and setup guide
```

## Pull Request checklist

Before creating a PR:

- [ ] UI works in Chrome/Edge/Firefox
- [ ] Mobile layout tested
- [ ] No console errors
- [ ] Meaningful commit message used
- [ ] README updated if needed
- [ ] No unnecessary dependency added
- [ ] Original implementation
- [ ] Another team member reviews the PR

## Demo Talking Points

For the final demonstration, show:

1. The landing page and design system.
2. Advanced job search and filtering.
3. Job details and company explorer.
4. Candidate dashboard and application funnel.
5. AI Career Assistant.
6. Live Resume Builder.
7. Analytics and Job Alerts.
8. Responsive/mobile behavior.
9. Git branches and commit history.
10. Pull Requests and code reviews.

## References

The project research was informed by the reference list provided in the hackathon brief:

- ThemeForest Site Templates
- Kombai Web Gallery
- Dribbble UI
- Uizard Templates
- Material UI Templates
- n8n Workflows

These references are used for **pattern research only**. SohniHire uses its own implementation and visual system.

## Note

This is a front-end UI template collection. Job data, authentication, real applications, email alerts, AI APIs, PDF generation, and backend persistence can be connected later.
