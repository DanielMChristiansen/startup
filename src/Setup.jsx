import React from 'react';
import '../setup.css';
import ICAL from 'ical.js';

let CALENDARS = [];

function cleanCalendars() {
  let calendars = JSON.parse(localStorage.getItem("calendars"));
  calendars.forEach((calendar, index) => {
    if (calendar.class.status) {
      calendar.class = calendar.class.value
      console.log(`Cleaned up calendar ${calendar.class}`);
    } else if (typeof(calendar.class) != "string") {
      console.log(`Calendar class is not a string! ${JSON.stringify(calendar.class)}`);
      calendar.class = calendar.link;
    }
  });
  localStorage.setItem("calendars", JSON.stringify(calendars));
}

function addCalendarsToDatabase() {
  // Implement when I have a database
  for (let calendar of CALENDARS) {
    fetch('/api/calendars', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({calendar: calendar.link}),
    });
  }
}

function removeCalendarFromDatabase(calendar) {
  // Implement when I have a database
  fetch('/api/calendars', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({calendar: calendar.link}),
  });
  localStorage.setItem("calendars", JSON.stringify(CALENDARS));
}

async function getClassName(url) {
  if (url.includes("byu.instructure.com")) {
    return "Canvas";
  } else if (url.includes("learningsuite.byu.edu")) {
    const response = await fetch(`/api/corsbypass?url=${encodeURIComponent(url)}`);
    const data = await response.text();
    const jcalData = ICAL.parse(data);
    const comp = new ICAL.Component(jcalData);
    const name = comp.getFirstPropertyValue("x-wr-calname");
    return name;
  } else {
    return "Unknown Class";
  }
}

function Setup() {
  let [calendarState, setCalendarState] = React.useState(CALENDARS);
  React.useEffect(() => {
    fetch('/api/authenticated').then(res => {
      if (res.status === 401) {
        navigate('/')
      } else {
        // Only fetch calendars if the user is authenticated
        fetch('/api/calendars').then(res => res.json()).then(data => {
        CALENDARS = data.calendars;
        setCalendarState(data.calendars);
      });
      }
    });
    
    // cleanCalendars();
  }, [])
  
  function removeCalendar(index) {
    setCalendarState(calendarState.filter((calendar, i) => i !== index));
    CALENDARS = calendarState.filter((calendar, i) => i !== index);
    removeCalendarFromDatabase();
  }

  async function addCalendar() {
    let calendarUrlInput = document.getElementById("calendarUrlInput");
    let calendarURL = calendarUrlInput.value;
    if (calendarURL) {
      if (!calendarURL.includes("learningsuite.byu.edu") && !calendarURL.includes("byu.instructure.com")) {
        alert("Invalid URL");
      } else {
        let newCalendar = {
          class: await getClassName(calendarURL),
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