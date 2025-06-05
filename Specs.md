# 🧩 AI Copilot UX & Functional Specification

## 🎯 Core UX Goals

1. **Minimize cognitive load**: interface must abstract complexity without sacrificing control
2. **Context-rich interaction**: provide persistent visibility into task/project state
3. **Seamless AI collaboration**: the copilot should feel like a real-time project co-manager
4. **Immediate feedback**: all user actions and copilot responses must have clear outcomes
5. **Responsiveness**: performant, fluid UI/UX, optimized for keyboard, mouse, and mobile

---

## 🖼 High-Level Screens & Layouts

### 1. 🔍 **Dashboard View**

* Overview of all active projects
* Key metrics: overdue tasks, % progress, recent changes
* CTA: "Ask the Copilot", "Start a New Project"

### 2. 📋 **Project Workspace**

* **Tabs:** Gantt | Kanban | Files | AI Chat | Team
* **Sidebar:** task filters, labels, search bar
* **Top Bar:** project name, deadline, team avatar stack, AI status (e.g. "Analyzing...")

### 3. 💬 **Copilot Chat Interface**

* Chat area with AI and user turns
* Inline message actions: "Create task from this", "Mark as resolved"
* Context pane with linked resources: tasks, files, people, messages
* History searchable and persistent per project

### 4. 🗂️ **Task Modal**

* Quick-open via keyboard or click
* Fields: name, description (markdown), assignee, due date, tags, dependencies
* Activity timeline with comments and AI suggestions

### 5. 📅 **Gantt View**

* Scrollable horizontal timeline, zoomable (days ↔ quarters)
* Drag & drop editing, dependency lines
* AI annotations: "Estimated delay", "Suggested reschedule"

### 6. 🧩 **Kanban Board**

* Drag cards across columns
* Card preview with inline controls (assign, complete, delete)
* AI hints (e.g. "This task might be blocked")

---

## 🧠 Copilot Interactions

### Types of Commands

* **Instructional:** "Create a task to onboard the new developer"
* **Analytical:** "Which tasks are overdue and unassigned?"
* **Predictive:** "Will we meet the project deadline at current pace?"
* **Reflective:** "Summarize this week’s progress"

### Assistant Capabilities

* Auto-tagging and categorization of tasks
* Conflict detection (e.g., overlapping timelines, unassigned critical path)
* Suggest breaking down complex tasks
* Response links to actions (e.g., button: \[Add as Task])

---

## 🧩 Additional Functional Requirements

### User Roles

* Admin / Project Manager / Contributor / Viewer
* Role-based UI elements and permissions

### Notifications

* Real-time (WebSocket): mentions, assignments, status changes
* Digest emails: daily summary, project status

### Accessibility

* Full keyboard navigation
* High-contrast mode
* Screen reader support for all dynamic elements

### Mobile Support

* Responsive layout for all core views
* Native mobile wrapper optional for push notifications

---

Vuoi ora che prepari i wireframe per ciascuna schermata o iniziamo a descrivere le logiche interne (stato, eventi, sincronizzazione)?
