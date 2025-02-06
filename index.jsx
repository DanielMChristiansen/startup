import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './headerandfooter.css'
import './login.css'
import './ataglance.css'
import './setup.css'
import './tutorial.css'

function Demo() {
  const [bgColor, setBgColor] = React.useState('white');

  const handleClick = () => {
    setBgColor(bgColor === 'white' ? 'yellow' : 'white');
  };
  return (
    <main>
      <div
        onClick={handleClick}
        style={{ backgroundColor: bgColor, height: '100vh', font: 'bold 20vh Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div> Hello React </div>
      </div>
    </main>
 )
}

function Login() {
  return (
    <main id="loginPage">
      <div className="shrinker">
        <input id="emailInput" type="email" placeholder=" 📧 Email:" className="loginField" /><br />
        <input id="passwordInput" type="password" placeholder=" 🔒 Password:" className="loginField" /><br />
        <div className="loginButtons">
          <button id="loginButton">Login</button>
          <button id="registerButton">Register</button>
        </div>
      </div>
    </main>
  )
}

function AtAGlanceAssignment({ dueDate, classTitle, title, done, classColor }) {
  return (
    <tr>
      <td>{dueDate}</td>
      <td style={{ backgroundColor: classColor }}>{classTitle}</td>
      <td>{title}</td>
      <td><input type="checkbox" defaultChecked={done} /></td>
    </tr>
  )
}

function AtAGlanceNextAssignment({title, dueDate}) {
  return (
    <td>
      <div className="dueDate closeDueDate smallText">Due {dueDate}</div><br />
      <p>{title}</p>
    </td>
  )
}

function AtAGlanceHeaderClass({classTitle, isLearningSuite}) {
  return (
    <td className="class1Color">{classTitle}{isLearningSuite && <sup><img width="20px" src="https://learningsuite.byu.edu/images/apple-touch-icon.png" alt="LearningSuite icon" /></sup>}</td>
  )
}

function DueDatePopup({classTitle, assignment, dueIn}) {
  <div id="dueDatePopup">
    <h4>Assignment Due Soon:</h4>
    <span>Class:</span> <span>{classTitle}</span><br />
    <span>Assignment:</span> <span>{assignment}</span><br />
    <span>Due In:</span> <span>{dueIn}</span><br />
  </div>
}

function AtAGlance() {
  return (
    <main id="atAGlancePage">
        <br />
        <table id="classesTable">
            <thead className="biggerText">
              <tr>
                <td>Classes:</td>
                <AtAGlanceHeaderClass classTitle="MATH 113" isLearningSuite={true} />
                <AtAGlanceHeaderClass classTitle="CS 260" isLearningSuite={false} />
                <AtAGlanceHeaderClass classTitle="CS 235" isLearningSuite={false} />
                <AtAGlanceHeaderClass classTitle="SWELL 120" isLearningSuite={true} />
                <AtAGlanceHeaderClass classTitle="CS 202" isLearningSuite={false} />
              </tr>
            </thead>
            <tbody>
              <tr className="normalText">
                <td className="biggerText">Next Assignment:</td>
                <AtAGlanceNextAssignment title="Online 6.1" dueDate="1/15" />
                <AtAGlanceNextAssignment title="Startup AWS" dueDate="1/21" />
                <AtAGlanceNextAssignment title="Homework 1b" dueDate="1/13" />
                <AtAGlanceNextAssignment title="Final Exam" dueDate="2/26" />
                <AtAGlanceNextAssignment title="Module 2 Quiz" dueDate="1/17" />
              </tr>
            </tbody>
        </table>
        <br />
        <span className="sameLine biggerText">Assignments:<button id="addAssignmentButton" className="biggerText">+ ADD</button></span> 
        <br />
        <table id="assignmentsTable" className="biggerText">
            <thead>
              <tr>
                <td>
                    <strong>Date</strong>
                </td>
                <td>
                    <strong>Class</strong>
                </td>
                <td>
                    <strong>Title</strong>
                </td>
                <td>
                    <strong>Done?</strong>
                </td>
              </tr>
            </thead>
            <tbody>    
              <AtAGlanceAssignment dueDate="1/9" classTitle="CS 235" title="Start of Semester Survey" done={true} classColor="#93c47d" />     
              <AtAGlanceAssignment dueDate="1/10" classTitle="MATH 113" title="Online 5.3" done={true} classColor="#f9cb9c" />
              <AtAGlanceAssignment dueDate="1/13" classTitle="CS 235" title="Homework 0" done={true} classColor="#93c47d" />
              <AtAGlanceAssignment dueDate="1/14" classTitle="CS 260" title="Startup Spec" done={true} classColor="#e06666" />
              <AtAGlanceAssignment dueDate="1/15" classTitle="MATH 113" title="Online 6.1" done={true} classColor="#f9cb9c" />
              <AtAGlanceAssignment dueDate="1/17" classTitle="CS 202" title="Module 2 Quiz" done={false} classColor="#666666" />
            </tbody>
        </table>
        <br />
        <DueDatePopup classTitle="MATH 113" assignment="Online 6.1" dueIn="3 hrs, 25 min, 50 seconds" />        
    </main>
  )
}

function Setup() {
  return (
    <main id="setupPage">
      <table id="calendarAddTable">
        <thead>
          <tr>
            <td><strong>Class</strong></td>
            <td><strong>Calendar Link</strong></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td>Canvas</td>
              <td>CALENDAR LINK HERE</td>
              <td><button>🗑️</button></td>
          </tr>
          <tr>
              <td><img width="15px" src="https://learningsuite.byu.edu/images/apple-touch-icon.png" alt="LearningSuite icon" />MATH 113</td>
              <td>CALENDAR LINK HERE</td>
              <td><button>🗑️</button></td>
          </tr>
        </tbody>
      </table>
      <br />
      <div>
        <input type="url" placeholder="Calendar Link Here" id="calendarUrlInput" /><button id="addCalendarButton">Add New Calendar</button>
        <br />
        <label htmlFor="isLearningSuiteCheckbox">LearningSuite Class?</label><input type="checkbox" name="isLearningSuiteCheckbox" id="isLearningSuiteCheckbox" />
      </div>
    </main> 
  )
}

function Tutorial() {
  return (
    <main id="tutorialPage">
      <h2>How to find Calendar Links in Canvas:</h2>
      <div className="canvasTutorial">
        <h3>Step 1: Click on the calendar icon</h3>
        <img src="tutorial/first_step.png" />
        <h3>Step 2: Click on "Calendar Feed"</h3>
        <img src="tutorial/second_step.png" />
        <h3>Step 3: Copy link</h3>
        <img src="tutorial/third_step.png" />
      </div>
      <h2>How to find Calendar Links in LearningSuite:</h2>
      <div className="learningSuiteTutorial">
        <h3>Step 1: Select the class</h3>
        <img src="tutorial/Learning_suite_step_1.png" />
        <h3>Step 2: Click on "Schedule"</h3>
        <img src="tutorial/Learning_suite_step_2.png" />
        <h3>Step 3: Click on "Get iCalendar Feed"</h3>
        <img src="tutorial/Learning_suite_step_3.png" />
        <h3>Step 4: Copy link</h3>
        <img src="tutorial/Learning_suite_step_4.png" />
      </div>
    </main>
  )
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ataglancePage" element={<AtAGlance />} />
            <Route path="/setupPage" element={<Setup />} />
            <Route path="/tutorialPage" element={<Tutorial />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function Header() {
  return (
    <header>
        <nav>
            <a href="#">Schedulify</a>
            <menu>
                <li><NavLink className="currPage" to="/">Login</NavLink></li>
                <li><NavLink to="/ataglancePage">At a Glance</NavLink></li>
                <li><NavLink to="/setupPage">Setup</NavLink></li>
                <li><NavLink to="/tutorialPage">Tutorial</NavLink></li>
            </menu>
        </nav>
    </header>
  )
}

function Footer () {
  return (
    <footer>
      <hr />
      <p>Daniel Christiansen</p><a href="https://github.com/DanielMChristiansen/startup">GitHub</a>
    </footer>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);