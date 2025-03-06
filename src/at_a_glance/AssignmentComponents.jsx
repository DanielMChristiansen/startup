import React from 'react';
import '../../ataglance.css';

function Assignment({ dueDate, classTitle, title, id, done, classColor }) {
    let [checked, setChecked] = React.useState(done);
    function updateAssignment(event) {
        // This is where we would interact with the backend to update the assignment
        alert(event.target.checked);
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