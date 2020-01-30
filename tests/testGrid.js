const grid = new Grid(10, 10);

const grid_reps = grid.getGrid();

const start_point = new Point(5, 5);
const possible_steps = grid.getPossibleSteps(start_point);

const ul_pos = document.createElement('ul');
const ul_grid = document.createElement('ul');

const div = document.getElementsByClassName('testing-ground');

const p_pos_steps = document.createElement('p');
p_pos_steps.innerText = `possible_steps from ${start_point.x} ${start_point.y}`;

const p_grid = document.createElement('p');
p_grid.innerText = 'Here is the Grid: ';

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

div[0].appendChild(p_pos_steps);
div[0].appendChild(ul_pos);
div[0]. appendChild(p_grid);
div[0].appendChild(ul_grid)


