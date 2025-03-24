import React from 'react';
import './DueDateNotification.css';

function DueDateNotification ({ assignmentName, onDismiss }) {
    return (
        <div className="due-date-notification">
            <button className="dismiss-button" onClick={onDismiss}>
                &times;
            </button>
            <p className="assignment-name">{assignmentName}</p>
        </div>
    );
};

export default DueDateNotification;