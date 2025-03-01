import React from 'react';
import '../ataglance.css';

function Assignment({ dueDate, classTitle, title, done, classColor }) {
    return (
        <tr>
        <td>{dueDate}</td>
        <td style={{ backgroundColor: classColor }}>{classTitle}</td>
        <td>{title}</td>
        <td><input type="checkbox" defaultChecked={done} /></td>
        </tr>
    )
}

function NextAssignment({title, dueDate}) {
    return (
        <td>
        <div className="dueDate closeDueDate smallText">Due {dueDate}</div><br />
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