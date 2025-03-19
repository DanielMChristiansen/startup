import React from 'react';
import '../setup.css';
import ICAL from 'ical.js';
import { useNavigate } from 'react-router-dom';
import { getClassName } from './quickview/Helpers';

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

async function addCalendarsToDatabase() {
  // Implement when I have a database
  for (let calendar of CALENDARS) {
    const response = fetch('/api/calendars', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({calendar: calendar.link}),
    });
    if (response.status === 401) {
      alert("You are not authenticated. Please log in again.");
      break;
    }
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
  }).then(res => {
    if (res.status === 401) {
      alert("You are not authenticated. Please log in again.");
    }
  });
  // localStorage.setItem("calendars", JSON.stringify(CALENDARS));
}

function Setup() {
  let [calendarState, setCalendarState] = React.useState(CALENDARS);
  let navigate = useNavigate();
  React.useEffect(() => {
    fetch('/api/authenticated').then(res => {
      if (res.status === 401) {
        alert("You are not authenticated. Please log in again.");
        navigate('/')
      } else {
        // Only fetch calendars if the user is authenticated
        fetch('/api/calendars').then(res => res.json()).then(data => {
          CALENDARS = [];
          for (let calendarLink of data.calendars) {
            CALENDARS.push({
              class: getClassName(calendarLink),
              link: calendarLink,
              isLearningSuite: calendarLink.includes("learningsuite.byu.edu")
            });
          }
          setCalendarState(CALENDARS);
      });
      }
    }).catch(err => {
      alert("Can't connect to server. Please try again later.");
      navigate('/')
    });
    
    // cleanCalendars();
  }, [])
  
  function removeCalendar(index) {
    let calendarToRemove = calendarState[index];
    setCalendarState(calendarState.filter((calendar, i) => i !== index));
    CALENDARS = calendarState.filter((calendar, i) => i !== index);
    removeCalendarFromDatabase(calendarToRemove);
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
    
    await addCalendarsToDatabase();
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