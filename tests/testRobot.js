
const robot = new Robot("bawwy", new Point(2, 2));
const assignment = new Assignment();
assignment.addPoint(new Point(5, 5));
robot.addAssignment(assignment);
//robot.calculateRoute();

const p = document.createElement('p');
p.innerText = `Route generated for ${robot.getName()} :`;

const ul = document.createElement('ul');

robot.route.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.x + ' ' + element.y;
    ul.appendChild(li);
});

div[0].appendChild(p);
div[0].appendChild(ul);

