import React from 'react';
import '../ataglance.css';
import { useNavigate } from "react-router-dom";
import ICAL from 'ical.js';

let ASSIGNMENTS = [];
let CLASS_COLORS = {};

// React useEffect doesn't like async functions so we define an inner one
async function loadAssignments() {
  JSON.parse(localStorage.calendars).forEach(async calendar => {
    let calendarAssignments = await getAssignments(calendar);
    let allAssignments = [...ASSIGNMENTS, ...calendarAssignments];
    allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    ASSIGNMENTS = allAssignments;
  });
}

async function getAssignments(calendar) {
  const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(calendar.link)}`);
  const data = await response.json();
  
  if (!calendar.isLearningSuite) { // data comes base64 encoded from canvas for some reason
    let b64Data = data.contents.split(",")[1];
    // This does the decoding for some reason, no idea why it's called that
    data.contents = atob(b64Data);
  }
  
  const jcalData = ICAL.parse(data.contents);
  const component = new ICAL.Component(jcalData);
  if (calendar.isLearningSuite) {
    let assignments = component.getAllSubcomponents("vevent").map(assignment => {
      return {
        id: assignment.getFirstPropertyValue("uid"),
        dueDate: assignment.getFirstPropertyValue("dtstart").toJSDate().toLocaleDateString(),
        classTitle: calendar.class,
        title: assignment.getFirstPropertyValue("summary")
      }
    });
    return assignments;
  } else {
    let assignments = component.getAllSubcomponents("vevent").map(assignment => {
      // Take class name from assignment title
      let assignmentTitle = assignment.getFirstPropertyValue("summary");
      assignmentTitle = assignmentTitle.split("[");
      let className = assignmentTitle.pop();
      // Remove end bracket from class name
      className = className.replace("]", "");
      assignmentTitle = assignmentTitle.join(" ");
      return {
        id: assignment.getFirstPropertyValue("uid"),
        dueDate: assignment.getFirstPropertyValue("dtstart").toJSDate().toLocaleDateString(),
        classTitle: className,
        title: assignmentTitle
      }
    });
    return assignments
  }
}

function getClasses() {
  let classes = [];
  ASSIGNMENTS.forEach(assignment => {
    if (!classes.includes(assignment.classTitle)) {
      classes.push(assignment.classTitle);
    }
  });
  return classes;
}

function getAssignmentColor(assignment) {
  let classes = getClasses();
  for (let index = 0; index < classes.length; index++) {
    const className = classes[index];
    if (className === assignment.classTitle) {
      return getClassColor(className);
    }
  }
}

function getClassColor(className) {
  if (CLASS_COLORS[className]) {
    return CLASS_COLORS[className];
  } else {
    let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    CLASS_COLORS[className] = color;
    return color;
  }

}

function getNextAssignment(className) {
  let nextAssignment = ASSIGNMENTS.find(assignment => assignment.classTitle === className);
  return nextAssignment;
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

function AtAGlanceHeaderClass({classTitle, classColor}) {
  return (
    <td style={{ backgroundColor: classColor }}>{classTitle}</td>
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
  const navigate = useNavigate();
  const [classes, setClasses] = React.useState([]);

  let [doneLoading, setDoneLoading] = React.useState(false);
  React.useEffect(() => {
    if (!localStorage.getItem('authenticated')) {
      alert('You must be logged in to view this page.')
      navigate('/')
      return;
    }
    
    if (JSON.parse(localStorage.calendars).length === 0) {
      alert('You must add calendars to view this page.')
      navigate('/setup')
      return;
    }
    loadAssignments().then(() => {
      setDoneLoading(true);
    });
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setClasses(getClasses());
    }, 1000);
  }, []);

  return (
    <main id="atAGlancePage">
      {doneLoading ? <p>{ASSIGNMENTS.length}</p> : <p>Loading...</p>}
        <br />
        <table id="classesTable">
            <thead className="biggerText">
              <tr>
                <td>Classes:</td>
                {
                  classes.map((className, index) => {
                    return <AtAGlanceHeaderClass key={index} classTitle={className} classColor={getClassColor(className)} />
                  })
                }
              </tr>
            </thead>
            <tbody>
              <tr className="normalText">
                <td className="biggerText">Next Assignment:</td>
                {
                  classes.map((className, index) => {
                    let assignment = getNextAssignment(className);
                    return <AtAGlanceNextAssignment key={index} title={assignment.title} dueDate={assignment.dueDate} />
                  })
                }
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
              {
                ASSIGNMENTS.map((assignment, index) => (
                  <AtAGlanceAssignment key={index} dueDate={assignment.dueDate} classTitle={assignment.classTitle} title={assignment.title} done={false} classColor={getAssignmentColor(assignment)} />
                ))
              }
            </tbody>
        </table>
        <br />
        <DueDatePopup classTitle="MATH 113" assignment="Online 6.1" dueIn="3 hrs, 25 min, 50 seconds" />        
    </main>
  )
}

export default AtAGlance;