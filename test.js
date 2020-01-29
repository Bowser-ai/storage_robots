const grid = new Grid(10, 10);

grid_reps = grid.getGrid();

possible_steps = grid.getPossibleSteps(new Point(5, 5));

console.log(possible_steps);

console.log(grid_reps);
