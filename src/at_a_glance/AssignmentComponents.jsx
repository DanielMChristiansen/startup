import React from 'react';
import '../../ataglance.css';

function getRemainingWorkdays(date) {
    // Set time to 11:59 PM
    date.setHours(23, 59, 0);
    let today = new Date();
    let remainingWorkdays = 0;
    if (date < today) {
        return -5;
    }
    while (today < date) {
        if (today.getDay() === 0 || today.getDay() === 6) {
            today.setDate(today.getDate() + 1);
        } else {
            remainingWorkdays++;
            today.setDate(today.getDate() + 1);
        }
    }
    return remainingWorkdays;
}

function Assignment({ dueDate, classTitle, title, id, done, classColor }) {
    let [checked, setChecked] = React.useState(done);
    function updateAssignment(event) {
        fetch(`/api/assignmentCompleted`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ done: event.target.checked, completedAssignmentId: id }),
        }).then(response => {
            if (response.status === 401) {
                alert("Unauthorized");
                // Uncheck the box
                event.target.checked = !event.target.checked;
            }
        }).catch(err => {
            alert("Error updating assignment");
            // Uncheck the box
            event.target.checked = !event.target.checked;
        }
        );
        
        setChecked(event.target.checked);
    }
    return (
        <tr>
        <td>{dueDate}</td>
        <td style={{ backgroundColor: classColor }}>{classTitle}</td>
        <td>{title}</td>
        <td><input type="checkbox" defaultChecked={checked} onChange={updateAssignment}/></td>
        </tr>
    )
}

function NextAssignment({title, dueDate}) {
    if (dueDate === "N/A") {
        return (
        <td>
        <p>{title}</p>
        </td>
        )
    } else {
        let date = new Date(dueDate);
        let remainingWorkdays = getRemainingWorkdays(date);
        if (remainingWorkdays === 0) {
            return (
            <td>
            <div className="dueDate closeDueDate smallText">Due: {dueDate}</div><br />
            <p>{title}</p>
            </td>
            )
        } else if (remainingWorkdays <= 0) {
            return (
            <td>
            <div className="dueDate pastDueDate smallText">Due: {dueDate}</div><br />
            <p>{title}</p>
            </td>
            )
        }else if (remainingWorkdays <= 5) {
            return (
            <td>
            <div className="dueDate medDueDate smallText">Due: {dueDate}</div><br />
            <p>{title}</p>
            </td>
            )
        }  else {
            return (
            <td>
            <div className="dueDate farDueDate smallText">Due: {dueDate}</div><br />
            <p>{title}</p>
            </td>
            )
        }
    }
    return (
        <td>
        <div className="dueDate closeDueDate smallText">Due: {dueDate}</div><br />
        <p>{title}</p>
        </td>
    )
}

function HeaderClass({classTitle, classColor}) {
    return (
        <td style={{ backgroundColor: classColor }}>{classTitle}</td>
    )
}

export { Assignment, NextAssignment, HeaderClass };