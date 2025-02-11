import React from 'react';
import '../setup.css'

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

export default Setup;