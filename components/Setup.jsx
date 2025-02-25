import React from 'react';
import '../setup.css';
import ICAL from 'ical.js';

let CALENDARS = [
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

async function getClassName(url) {
  if (url.includes("byu.instructure.com")) {
    return "Canvas";
  } else if (url.includes("learningsuite.byu.edu")) {
    const response = await fetch(`https://proxy.corsfix.com/?${url}`);
    const data = await response.text();
    const jcalData = ICAL.parse(data);
    const comp = new ICAL.Component(jcalData);
    console.log(comp);
    const name = comp.getFirstPropertyValue("x-wr-calname");
    console.log(name);
    return name;
  } else {
    return "Unknown Class";
  }
}

function Setup() {
  let [calendarState, setCalendarState] = React.useState(CALENDARS);
  
  function removeCalendar(index) {
    setCalendarState(calendarState.filter((calendar, i) => i !== index));
    CALENDARS = calendarState;
  }

  function addCalendar() {
    let calendarUrlInput = document.getElementById("calendarUrlInput");
    let calendarURL = calendarUrlInput.value;
    if (!calendarURL) return;
    if (calendarURL.includes("learningsuite.byu.edu") || calendarURL.includes("byu.instructure.com")) {
      let newCalendar = {
        class: getClassName(calendarURL),
        link: calendarUrlInput.value,
        isLearningSuite: calendarURL.includes("learningsuite.byu.edu")
      };
      setCalendarState([...calendarState, newCalendar]);
      CALENDARS = calendarState;
    } else {
      alert("Invalid URL");
    }
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
            <CalendarElem calendar={calendar} index={index} removeFunc={removeCalendar}/>
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

function CalendarElem({calendar, index, removeFunc}) {
  return (
    <tr>
      {calendar.isLearningSuite ? <td><img width="15px" src="https://learningsuite.byu.edu/images/ls_logo.svg" alt="LearningSuite icon" /> {calendar.class}</td> : <td>{calendar.class}</td>}
      <td>{calendar.link}</td>
      <td><button onClick={() => removeFunc(index)}>🗑️</button></td>
    </tr>
  )
}

export default Setup;