import React from 'react';
import '../tutorial.css'

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
        <p>Page icon designed by Freepik from Flaticon</p>
      </main>
    )
}

export default Tutorial;