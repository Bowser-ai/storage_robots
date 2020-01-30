const grid = new Grid(10, 10);

const grid_reps = grid.getGrid();

const possible_steps = grid.getPossibleSteps(new Point(5, 5));

const ul_pos = document.createElement('ul');
const ul_grid = document.createElement('ul');

const div = document.getElementsByClassName('testing-ground');

possible_steps.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.x + " " + element.y;
    ul_pos.appendChild(li);
});

grid_reps.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.x + " " + element.y;
    ul_grid.appendChild(li);
});

div[0].appendChild(ul_pos);
div[0].appendChild(ul_grid)


const robot = new Robot("bawwy", new Point(2, 2));
const assignment = new Assignment();
assignment.addPoint(new Point(5, 5));
robot.addAssignment(assignment);

