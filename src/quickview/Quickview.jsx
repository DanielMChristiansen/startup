import React from 'react';
import '../../quickview.css';
import { useNavigate } from "react-router-dom";
import ICAL from 'ical.js';
import {Assignment, NextAssignment, HeaderClass} from './AssignmentComponents';
import {getAssignments, getClasses, getClassName} from './Helpers';
import randomColor from 'randomcolor';
import DueDateNotification from './DueDateNotification';

let ASSIGNMENTS = [];

// React useEffect doesn't like async functions so we define an inner one
async function loadAssignments(setAssignments) {
  let response = await fetch('/api/calendars');
  if (response.status === 401) {
    alert("You are not authenticated. Please log in again.");
    navigate('/');
    return;
  }
  let calendars = await response.json();
  calendars.calendars.forEach(async calendarLink => {
    let calendar = {
      link: calendarLink,
      class: await getClassName(calendarLink),
      isLearningSuite: calendarLink.includes("learningsuite.byu.edu"),
    }
    let calendarAssignments = await getAssignments(calendar, setAssignments);
    let allAssignments = [...ASSIGNMENTS, ...calendarAssignments];
    allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    ASSIGNMENTS = allAssignments;
  });
}

function getAssignmentColor(assignment) {
  let classes = getClasses(ASSIGNMENTS);
  for (let index = 0; index < classes.length; index++) {
    const className = classes[index];
    if (className === assignment.classTitle) {
      return getClassColor(className);
    }
  }
}

function getClassColor(className) {
  return randomColor({
    seed: className,  // Using the name as a seed ensures the same color each time
    luminosity: 'bright',  // Optionally control brightness for more vibrant colors
    format: 'hex'  // Color will be returned in hex format
  });
}

function getNextAssignment(className, completedAssignments) {
  let nextAssignment = ASSIGNMENTS.find(assignment => {
    return assignment.classTitle === className && !completedAssignments.includes(assignment.id);
  });
  return nextAssignment;
}

function DueDatePopup({classTitle, assignment, dueIn}) {
  <div id="dueDatePopup">
    <h4>Assignment Due Soon:</h4>
    <span>Class:</span> <span>{classTitle}</span><br />
    <span>Assignment:</span> <span>{assignment}</span><br />
    <span>Due In:</span> <span>{dueIn}</span><br />
  </div>
}

function Quickview() {
  const navigate = useNavigate();
  let [classes, setClasses] = React.useState([]);
  let [assignments, setAssignments] = React.useState(ASSIGNMENTS);
  let [completedAssignments, setCompletedAssignments] = React.useState([]);
  let [assignmentDueSoon, setAssignmentDueSoon] = React.useState(false);
  
  React.useEffect(() => {
    fetch('/api/authenticated').then(res => {
      if (res.status === 401) {
        alert("You are not authenticated. Please log in again.");
        navigate('/')
      } else if (res.ok) {
          loadAssignments(setAssignments).then(() => {
            ASSIGNMENTS = []
            setAssignments(assignments);
            setClasses(getClasses(ASSIGNMENTS));
            fetch('/api/completedAssignments').then(res => res.json()).then(data => {
              setCompletedAssignments(data.completedAssignments);
            });
        });
      }
    });
  }, [])

  React.useEffect(() => {
    let tempClasses = getClasses(assignments);
    setClasses(classes.concat(tempClasses));
  }, [assignments]);

  React.useEffect(() => {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    socket.onmessage = (event) => {
      const message = event.data;
      if (message === 'Assignment may be due soon') {
        if (ASSIGNMENTS.find(element => isIncompleteAndDueTonight(element))) { // No need to show an empty notification
          setAssignmentDueSoon(true);
        }
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  function isIncompleteAndDueTonight(assignment) {
    return !completedAssignments.includes(assignment.id) && new Date(assignment.dueDate).toDateString() === new Date().toDateString();
  }

  return (
    <main id="quickviewPage">
        <br />
        <table id="classesTable">
            <thead className="biggerText">
              <tr>
                <td>Classes:</td>
                {
                  classes.map((className, index) => {
                    return <HeaderClass key={index} classTitle={className} classColor={getClassColor(className)} />
                  })
                }
              </tr>
            </thead>
            <tbody>
              <tr className="normalText">
                <td className="biggerText">Next Assignment:</td>
                {
                  classes.map((className, index) => {
                    let assignment = getNextAssignment(className, completedAssignments);
                    if (assignment) {
                      return <NextAssignment key={index} title={assignment.title} dueDate={assignment.dueDate} />
                    }
                    return <NextAssignment key={index} title="No uncompleted assignments" dueDate="N/A" />
                  })
                }
              </tr>
            </tbody>
        </table>
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
                  !completedAssignments.includes(assignment.id) ? <Assignment key={index} dueDate={assignment.dueDate} classTitle={assignment.classTitle} title={assignment.title} id={assignment.id} done={completedAssignments.includes(assignment.id)} classColor={getAssignmentColor(assignment)} /> : null
                ))
              }
            </tbody>
        </table>
        <br />
        {assignmentDueSoon && <DueDateNotification assignments={ASSIGNMENTS.filter(element => isIncompleteAndDueTonight(element))} onDismiss={() => {setAssignmentDueSoon(false)}} /> }
    </main>
  )
}

export default Quickview;