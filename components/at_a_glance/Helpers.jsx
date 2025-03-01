async function getAssignments(calendar) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(calendar.link)}`);
    const data = await response.json();
    
    if (!calendar.isLearningSuite) { // data comes base64 encoded from canvas for some reason
        let b64Data = data.contents.split(",")[1];
        // This does the decoding for some reason, no idea why it's called that
        data.contents = atob(b64Data);
    }
    
    const jcalData = ICAL.parse(data.contents);
    const component = new ICAL.Component(jcalData);
    if (calendar.isLearningSuite) {
        let assignments = component.getAllSubcomponents("vevent").map(assignment => {
        return {
            dueDate: assignment.getFirstPropertyValue("dtstart").toJSDate().toLocaleDateString(),
            classTitle: calendar.class,
            title: assignment.getFirstPropertyValue("summary")
            id: assignment.getFirstPropertyValue("uid"),
        }
      });
      return assignments;
    } else {
        let assignments = component.getAllSubcomponents("vevent").map(assignment => {
        // Take class name from assignment title
        let assignmentTitle = assignment.getFirstPropertyValue("summary");
        assignmentTitle = assignmentTitle.split("[");
        let className = assignmentTitle.pop();
        // Remove end bracket from class name
        className = className.replace("]", "");
        assignmentTitle = assignmentTitle.join(" ");
        return {
            dueDate: assignment.getFirstPropertyValue("dtstart").toJSDate().toLocaleDateString(),
            classTitle: className,
            title: assignmentTitle
            id: assignment.getFirstPropertyValue("uid"),
        }
      });
      return assignments
    }
  }

 function getClasses(assignments) {
    let classes = [];
    assignments.forEach(assignment => {
        if (!classes.includes(assignment.classTitle)) {
            classes.push(assignment.classTitle);
        }
    });
    return classes;
}

export { getAssignments, getClasses };