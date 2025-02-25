import React from 'react';
import '../setup.css';
import ICAL from 'ical.js';

let CALENDARS;
if (localStorage.getItem("calendars")) {
  // Clean up Promise objects in storage
  let calendars = JSON.parse(localStorage.getItem("calendars"));
  calendars.forEach((calendar, index) => {
    if (calendar.class.status) {
      calendar.class = calendar.class.value
      console.log(`Cleaned up calendar ${calendar.class}`);
    }
  });
  localStorage.setItem("calendars", JSON.stringify(calendars));


  CALENDARS = JSON.parse(localStorage.getItem("calendars"));
} else {
CALENDARS = [
  {
    class: "Canvas",
    link: "CALENDAR LINK HERE",
    isLearningSuite: false
  },
  {
    class: "MATH 113",
    link: "CALENDAR LINK HERE",
    isLearningSuite: true
  }
];
}

function addCalendarsToDatabase() {
  // Implement when I have a database
  localStorage.setItem("calendars", JSON.stringify(CALENDARS));
}

function removeCalendarFromDatabase(calendar) {
  // Implement when I have a database
  localStorage.setItem("calendars", JSON.stringify(CALENDARS));
}

async function getClassName(url) {
  if (url.includes("byu.instructure.com")) {
    return "Canvas";
  } else if (url.includes("learningsuite.byu.edu")) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    const jcalData = ICAL.parse(data.contents);
    const comp = new ICAL.Component(jcalData);
    const name = comp.getFirstPropertyValue("x-wr-calname");
    return name;
  } else {
    return "Unknown Class";
  }
}

function Setup() {
  let [calendarState, setCalendarState] = React.useState(CALENDARS);
  
  function removeCalendar(index) {
    setCalendarState(calendarState.filter((calendar, i) => i !== index));
    CALENDARS = calendarState.filter((calendar, i) => i !== index);
    removeCalendarFromDatabase();
  }

  function addCalendar() {
    let calendarUrlInput = document.getElementById("calendarUrlInput");
    let calendarURL = calendarUrlInput.value;
    if (calendarURL) {
      if (!calendarURL.includes("learningsuite.byu.edu") && !calendarURL.includes("byu.instructure.com")) {
        alert("Invalid URL");
      } else {
        let newCalendar = {
          class: getClassName(calendarURL),
          link: calendarUrlInput.value,
          isLearningSuite: calendarURL.includes("learningsuite.byu.edu")
        };
        const updatedCalendars = [...calendarState, newCalendar];
        setCalendarState(updatedCalendars);
        CALENDARS = updatedCalendars;
        calendarUrlInput.value = "";
      }
    }
    
    addCalendarsToDatabase();
  }
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
          {calendarState.map((calendar, index) => (
            <tr>
              {calendar.isLearningSuite ? <td><img width="15px" src="https://learningsuite.byu.edu/images/ls_logo.svg" alt="LearningSuite icon" /> {calendar.class}</td>: <td>{calendar.class}</td>}
              
              <td>{calendar.link}</td>
              <td><button onClick={() => removeCalendar(index)}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        <input type="url" placeholder="Calendar Link Here" id="calendarUrlInput" /><button id="addCalendarButton" onClick={addCalendar}>Add New Calendar</button>
      </div>
    </main>
  )
}

export default Setup;