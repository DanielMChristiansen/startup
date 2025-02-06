import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './headerandfooter.css'

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
    <main>
      <div class="shrinker">
        <input id="emailInput" type="email" placeholder=" 📧 Email:" class="loginField" /><br />
        <input id="passwordInput" type="password" placeholder=" 🔒 Password:" class="loginField" /><br />
        <div class="loginButtons">
          <button id="loginButton">Login</button>
          <button id="registerButton">Register</button>
        </div>
      </div>
    </main>
  )
}


function AtAGlance() {
  return (
    <main>
        <br />
        <table id="classesTable">
            <thead class="biggerText">
                <td>Classes:</td>
                <td class="class1Color">MATH 113<sup><img width="20px" src="https://learningsuite.byu.edu/images/apple-touch-icon.png" alt="LearningSuite icon" /></sup></td>
                <td class="class2Color">CS 260</td>
                <td class="class3Color">CS 235</td>
                <td class="class4Color">SWELL 120<sup><img width="20px" src="https://learningsuite.byu.edu/images/apple-touch-icon.png" alt="LearningSuite icon" /></sup></td>
                <td class="class5Color">CS 202</td>
            </thead>
            <tr class="normalText">
                <td class="biggerText">Next Assignment:</td>
                <td>
                    <div class="dueDate closeDueDate smallText">Due 1/15</div><br />
                    <p>Online: 6.1</p>
                </td>
                <td>
                    <div class="dueDate medDueDate smallText">Due 1/21</div><br />
                    <p>Startup AWS</p>
                </td>
                <td>
                    <div class="dueDate pastDueDate smallText">Due 1/13</div><br />
                    <p>Homework 1b</p>
                </td>
                <td>
                    <div class="dueDate farDueDate smallText">Due 2/26</div><br />
                    <p>Final Exam</p>
                </td>
                <td>
                    <div class="dueDate medDueDate smallText">Due 1/17</div><br />
                    <p>Module 2 Quiz</p>
                </td>
            </tr>
        </table>
        <br />
        <span class="sameLine biggerText">Assignments:<button id="addAssignmentButton" class="biggerText">+ ADD</button></span> 
        <br />
        <table id="assignmentsTable" class="biggerText">
            <thead>
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
            </thead>
            <tr>
                <td>1/9</td>
                <td class="class3Color">CS 235</td>
                <td>Start of Semester Survey</td>
                <td><input type="checkbox" checked /></td>
            </tr>
            <tr>
                <td>1/10</td>
                <td class="class1Color">MATH 113</td>
                <td>Online 5.3</td>
                <td><input type="checkbox" checked /></td>
            </tr>
            <tr>
                <td>1/13</td>
                <td class="class3Color">CS 235</td>
                <td>Homework 0</td>
                <td><input type="checkbox" checked /></td>
            </tr>
            <tr>
                <td>1/14</td>
                <td class="class2Color">CS 260</td>
                <td>Startup Spec</td>
                <td><input type="checkbox" checked /></td>
            </tr>
            <tr>
                <td>1/15</td>
                <td class="class1Color">MATH 113</td>
                <td>Online 6.1</td>
                <td><input type="checkbox" checked /></td>
            </tr>
            <tr>
                <td>1/17</td>
                <td class="class5Color">CS 202</td>
                <td>Module 2 Quiz</td>
                <td><input type="checkbox" /></td>
            </tr>
        </table>
        <br />
        <div id="dueDatePopup">
            <h4>Assignment Due Soon:</h4>
            <span>Class:</span> <span>MATH 113</span><br />
            <span>Assignment:</span> <span>Online 6.1</span><br />
            <span>Due In:</span> <span>3 hrs, 25 min, 50 seconds</span><br />
        </div>
        
    </main>
  )
}

function Setup() {
  return (
    <main>
      <table id="calendarAddTable">
        <thead>
            <td><strong>Class</strong></td>
            <td><strong>Calendar Link</strong></td>
            <td></td>
        </thead>
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
      </table>
      <br />
      <div>
        <input type="url" placeholder="Calendar Link Here" id="calendarUrlInput" /><button id="addCalendarButton">Add New Calendar</button>
        <br />
        <label for="isLearningSuiteCheckbox">LearningSuite Class?</label><input type="checkbox" name="isLearningSuiteCheckbox" id="isLearningSuiteCheckbox" />
      </div>
    </main> 
  )
}

function Tutorial() {
  return (
    <main>
      <h2>How to find Calendar Links in Canvas:</h2>
      <div class="canvasTutorial">
        <h3>Step 1: Click on the calendar icon</h3>
        <img src="tutorial/first_step.png" />
        <h3>Step 2: Click on "Calendar Feed"</h3>
        <img src="tutorial/second_step.png" />
        <h3>Step 3: Copy link</h3>
        <img src="tutorial/third_step.png" />
      </div>
      <h2>How to find Calendar Links in LearningSuite:</h2>
      <div class="learningSuiteTutorial">
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
                <li><NavLink class="currPage" to="/">Login</NavLink></li>
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