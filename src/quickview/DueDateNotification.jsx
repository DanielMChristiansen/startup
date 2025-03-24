import React from 'react';
import './DueDateNotification.css';

function DueDateNotification ({ assignments, onDismiss }) {
    return (
        <div className="due-date-notification">
            <button className="dismiss-button" onClick={onDismiss}>
                &times;
            </button>
            <h3>{assignments.length} Assignments Due Soon:</h3>
            <ul>
                {
                    assignments.map(assignment => (
                        <li className="assignment-name">{assignment.title}</li>
                    ))
                }
            </ul>
            
        </div>
    );
};

export default DueDateNotification;