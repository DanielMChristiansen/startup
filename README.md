# Schedulify

[My Notes](notes.md)

Users will sign up and provide calendar links from Canvas and/or LearningSuite classes. The app will use those provided links to extract individual assignments, calculate school days remaining until due date, notify user about exams and essays in advance, and keep track of completed assignments. It will present this information in the form of a digital planner.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

In a time where students juggle so many responsibilities, keeping track of all their assignments from two different constantly updating platform can seem impossible. Luckily, Schedulify is an automated digital planner application integrating with Instructure Canvas and BYU LearningSuite allowing students to keep track of their assignments at a glance in a single location. The digital nature of the planner allows it to automatically keep up to date with changes made in Canvas or LearningSuite.

### Design

![Login Page](Login.svg)
![Main Page](AtAGlance.svg)

```mermaid
sequenceDiagram
    Client->>Server: Login
    Server->>Database: Fetch Assignment Calendar
    Client->>Server: New Assignment
    Client->>Server: Add/Delete Class Calendar
    Server->>Database: Update Assignment/Calendar Info
    Server->>Client: Assignment Due Soon!
    Client->>Database: Assignment Completed
```

### Key features

- Register, login, and logout
- Add class calendars
- Add assignments
- Mark assignments completed
- Be notified of upcoming deadlines

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Four different views: Login/register, setup/edit class & assignment data, at-a-glance view, and tutorial of how to get calendar links
- **CSS** - Color coded classes, button animation, responsive design
- **React** - Single page application with routing between views and reactive user controls
- **Service** - Endpoints for authentication, updating assignment and calendar data, third-party call to Canvas and LearningSuite for assignment list
- **DB/Login** - Store authentication and assignment/calendar info on a per-user basis
- **WebSocket** - Notify user about upcoming assignments

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://danielmchristiansen.xyz).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created 4 seperate pages for the website for the 4 main functionalities.
- [x] **Proper HTML element usage** - I did complete this part of the deliverable.
- [x] **Links** - I used links to join together the different pages of the website.
- [x] **Text** - There is text.
- [x] **3rd party API placeholder** - I have a placeholder table for the information to be fetched from Canvas and LearningSuite.
- [x] **Images** - The tutorial page includes several images to walk the user through the process
- [x] **Login placeholder** - The website starts on the login placeholder page.
- [x] **DB data placeholder** - I have several tables with placeholder data to be fetched from a DB.
- [x] **WebSocket placeholder** - I added a placeholder popup that will be triggered by a websocket message.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - These elements are kept separate and styled separatly. Base styling is kept in a separate file for consistency and reducing duplication.
- [x] **Navigation elements** - These are represented as anchor tags styled into the navbar.
- [x] **Responsive to window resizing** - Pages will resize or change to fit on many browser/device sizes.
- [x] **Application elements** - Appropriate elements have been used to ensure accessibility.
- [x] **Application text content** - Text content has been styled.
- [x] **Application images** - Images react to page size changes.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I did complete this part of the deliverable.
- [x] **Components** - I created several custom components on the At a Glance page for segments that will be frequently repeated
- [x] **Router** - Routing between Login, At a Glance, Setup, Tutorial.

## 🚀 React part 2: Reactivity

- [x] **All functionality implemented or mocked out** - My application takes input from the user for calendar links and fetches data based upon that.
- [x] **Hooks** - I used `useState` and `useEffect` hooks.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I completed this part of the deliverable.
- [x] **Static middleware for frontend** - React frontend is in fact served statically.
- [x] **Calls to third party endpoints** - Requests are made to Canvas and LearningSuite to fetch assignments.
- [x] **Backend service endpoints** - I have implemented register, login, fetching and updating of calendar links, fetching and updating of completed assignments, and logout.
- [x] **Frontend calls service endpoints** - The login page calls the register, login, and logout endpoints. The At a Glance page fetches calendar links and both fetches and updates completed assignments. The Setup page gets and updates the calendar links.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
