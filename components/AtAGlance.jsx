import React from 'react';
import '../ataglance.css'

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
  
  function AtAGlanceHeaderClass({classTitle, isLearningSuite, classColor}) {
    return (
      <td style={{ backgroundColor: classColor }}>{classTitle}{isLearningSuite && <sup><img width="20px" src="https://learningsuite.byu.edu/images/ls_logo.svg" alt="LearningSuite icon" /></sup>}</td>
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
                  <AtAGlanceHeaderClass classTitle="MATH 113" isLearningSuite={true} classColor="#f9cb9c"/>
                  <AtAGlanceHeaderClass classTitle="CS 260" isLearningSuite={false} classColor="#e06666"/>
                  <AtAGlanceHeaderClass classTitle="CS 235" isLearningSuite={false} classColor="#93c47d"/>
                  <AtAGlanceHeaderClass classTitle="SWELL 120" isLearningSuite={true} classColor="#9fc5e8"/>
                  <AtAGlanceHeaderClass classTitle="CS 202" isLearningSuite={false} classColor="#666666"/>
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

export default AtAGlance;