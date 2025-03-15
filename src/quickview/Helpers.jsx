import ICAL from 'ical.js';
async function getAssignments(calendar, setAssignments) {
    const response = await fetch(`/api/corsbypass?url=${encodeURIComponent(calendar.link)}`);
    const data = await response.text();
    
    // if (!calendar.isLearningSuite) { // data comes base64 encoded from canvas for some reason
    //     let b64Data = data.split(",")[1];
    //     // This does the decoding for some reason, no idea why it's called that
    //     data = atob(b64Data);
    // }
    
    const jcalData = ICAL.parse(data);
    const component = new ICAL.Component(jcalData);
    if (calendar.isLearningSuite) {
        let assignments = component.getAllSubcomponents("vevent").map(assignment => {
            return {
                dueDate: assignment.getFirstPropertyValue("dtstart").toJSDate().toLocaleDateString(),
                classTitle: calendar.class,
                title: assignment.getFirstPropertyValue("summary"),
                id: assignment.getFirstPropertyValue("uid"),
            }
        });
        // Remove duplicate assignments
        assignments = assignments.filter((assignment, index, self) =>
            index === self.findIndex((a) => a.id === assignment.id)
        );
        setAssignments(assignments);
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
                title: assignmentTitle,
                id: assignment.getFirstPropertyValue("uid"),
            }
        });
        // Remove duplicate assignments
        assignments = assignments.filter((assignment, index, self) =>
            index === self.findIndex((a) => a.id === assignment.id)
        );
        setAssignments(assignments);
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

export { getAssignments, getClasses, getClassName };