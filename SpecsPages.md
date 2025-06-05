# 🧭 Page-by-Page UX Specification: AI Copilot App

---

## 🔍 1. Dashboard View

### Purpose

Provides a global snapshot across all projects. Acts as the entry point for user interaction with the system and the copilot.

### Layout

* **Top Bar:** Logo, profile menu, notifications, theme switcher
* **Main Grid:**

  * Project cards with:

    * Project name + status badge
    * Progress bar (% complete)
    * Team avatars
    * Copilot summary ("4 overdue, 2 stalled")
    * Button: \[Open Project]
* **Right Sidebar:**

  * \[Ask the Copilot] button (persistent)
  * Suggestions: “Ask about project risks”, “Start a retrospective”

### User Actions

* Search projects
* Create new project
* Pin favorite projects

---

## 📋 2. Project Workspace

### Purpose

The central hub for project-specific collaboration, tracking, and planning.

### Layout

* **Header:** Project title, deadline, avatar group, settings icon
* **Main Panel (tabbed):**

  * Gantt
  * Kanban
  * Files
  * AI Chat
  * Team
* **Left Sidebar:**

  * Task filters (status, tags, assignee)
  * Search field (deep search tasks & messages)
* **Right Sidebar:**

  * Contextual (e.g., selected task info, copilot insights)

### Special Behaviors

* Tab state persists per user per project
* Multiselect tasks (bulk actions)

---

## 💬 3. Copilot Chat Interface

### Purpose

Enables semantic command input and contextual dialogue with the AI assistant.

### Layout

* **Chat Feed:** Threaded messages, labeled "You" / "Copilot"
* **Input Field:** Rich text, emoji, file attach, slash commands
* **Message Options:**

  * Create task from reply
  * Link to task/file
  * Bookmark
* **Context Drawer:**

  * Shows related entities (e.g., task: #onboarding, file: spec.pdf)
  * Scrollable history, searchable

### AI Response Format

* Suggestion blocks
* Actionable buttons: \[Assign], \[Reschedule], \[Split Task]
* Follow-up prompts

---

## 🗂️ 4. Task Modal

### Purpose

Detailed editing and review of individual tasks.

### Layout

* **Header:** Task name, status dropdown, assignee avatar, priority
* **Body:**

  * Description (markdown editor)
  * Subtasks + progress
  * Dependencies graph (minimal)
  * Due date / estimate picker
* **Sidebar:**

  * AI suggestions (split, delegate, reprioritize)
  * Activity log with timestamps and actors
  * Comments thread (collapsible)

### Triggers

* Click on task card
* \[Create Task] button
* AI Chat → Create Task

---

## 📅 5. Gantt View

### Purpose

Macro-level timeline visualization with editing capabilities.

### Layout

* **Header:** Zoom control (day/week/month/quarter), today button, filter
* **Main Area:**

  * Time axis + task bars
  * Drag handles to modify duration
  * Lines for dependencies
* **Right Panel:**

  * Suggestions (reschedule conflicts, critical path bottlenecks)

### UX Notes

* Snapping enabled
* Conflict alert overlays (e.g., red bar for overdue)

---

## 🧩 6. Kanban Board

### Purpose

Status-driven task management with intuitive drag-and-drop.

### Layout

* **Columns:** Customizable (default: To Do / In Progress / Review / Done)
* **Cards:**

  * Title, assignee, tags, deadline
  * AI annotations: "Likely blocked", "Related to onboarding"
  * Quick actions (checklist, complete, delete)

### Features

* Column WIP limits
* Inline task creation
* Color-coded task types

---

Se vuoi, posso ora mappare i flussi di interazione utente o definire le transizioni di stato tra pagine e componenti.
