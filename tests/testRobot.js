
const LIST_OF_ROBOTS_SELECTOR = '[data-role="list-of-robots"]';
const ADD_ROBOT_BUTTON_SELECTOR = '[data-role="add-robot"]';
const CONTROL_PANELS = '[data-role="control-panels"]';
const INPUT_ROBOT_NAME_SELECTOR = '[data-role="get-robot-name"]';
const INPUT_X_COORD_INIT = '[data-role="get-x-coord"]';
const INPUT_Y_COORD_INIT = '[data-role="get-y-coord"]';

const grid = new Grid(10, 10);

const list_of_robots = document.querySelector(LIST_OF_ROBOTS_SELECTOR);
const add_robot_button = document.querySelector(ADD_ROBOT_BUTTON_SELECTOR);
const control_panels = document.querySelector(CONTROL_PANELS);

const list_of_robot_obj = [];



function createAddAssignmentButton(robot) {
  const add_assignment_button = document.createElement('button');
  add_assignment_button.innerText = "Add Assignment";
  add_assignment_button.id = robot.getName();
  return add_assignment_button;
}

function createGoButton() {
  const go_button = document.createElement('button');
  go_button.innerText = "GO!";
  return go_button;
}

function createSendAssignmentButton(robot) {
  const send_assignment_button = document.createElement('button');
  send_assignment_button.innerText = `Send Assignment to ${robot.getName()}`;
  return send_assignment_button;
}

function createCurrentLocationField(robot) {
  const current_location_field = document.createElement('p');
  current_location_field.id = `current-${robot.getName()}`;
  current_location_field.innerText =
  'Current Location = ' +
  `${robot.getCurrentLocation().x} (x)  ${robot.getCurrentLocation().y} (y)`;
  return current_location_field;
}

function createCurrentTargetField(robot) {
  const current_target_field = document.createElement('p');
  current_target_field.id = `target-${robot.getName()}`;
  const current_target = robot.route[0];
  current_target_field.innerText = current_target ?
  `Next Coordinate: ${current_target.x}, ${current_target.y}` : "Next Coordinate: No route defined";

  return current_target_field;
}

function createAddXYCoordAssignment(x) {
  const addXAssignment = document.createElement('input');
  addXAssignment.setAttribute('type', 'number');
  addXAssignment.setAttribute('placeholder', `Enter ${x} Coord....`);
  return addXAssignment;
}

add_robot_button.addEventListener('click', e => {
  const list_of_assignments = document.createElement('ul');
  const robot_list_element = document.createElement('li');
  const robot_name = document.querySelector(INPUT_ROBOT_NAME_SELECTOR).value;
  const init_coord_x = Number(document.querySelector(INPUT_X_COORD_INIT).value);
  const init_coord_y = Number(document.querySelector(INPUT_Y_COORD_INIT).value);

  const robot = new Robot(robot_name, new Point(init_coord_x, init_coord_y), grid);

  list_of_robot_obj.push(robot);

  robot_list_element.innerText = `${robot_name}`;
  list_of_robots.appendChild(robot_list_element);

  const name = document.createElement('h1');
  name.innerText = robot.getName();
  const control_panel = document.createElement('div');
  const add_assignment_button = createAddAssignmentButton(robot)
  const send_assignment_button = createSendAssignmentButton(robot);
  const addX = createAddXYCoordAssignment('X');
  const addY = createAddXYCoordAssignment('Y');
  const target_field = createCurrentTargetField(robot);
  const location_field = createCurrentLocationField(robot);
  const go_button = createGoButton();

  assignment = new Assignment();

  addAssignmentEventHandler(add_assignment_button, assignment, list_of_assignments, addX, addY, robot);
  addSendAssignmentEventHandler(send_assignment_button, target_field, assignment, list_of_assignments, robot);

  control_panels.appendChild(name);
  control_panel.appendChild(location_field);
  control_panel.appendChild(target_field);
  control_panel.appendChild(addX);
  control_panel.appendChild(addY);
  control_panel.appendChild(add_assignment_button);
  control_panel.appendChild(list_of_assignments);
  control_panel.appendChild(send_assignment_button);
  control_panels.appendChild(control_panel);
});

function addAssignmentEventHandler(button, assignment, list_of_assignments, input_x, input_y, robot) {
  button.addEventListener('click', e => {
    assignment.addPoint(new Point(Number(input_x.value), Number(input_y.value)));
    const assignment_item = document.createElement('ul');
    assignment_item.innerText = `assignment-item ${input_x.value} ${input_y.value}`;
    list_of_assignments.appendChild(assignment_item);
    return assignment;
  });
}

function addSendAssignmentEventHandler(button ,target_field, assignment, list_of_assignments, robot) {
  button.addEventListener('click', e => {

    while(list_of_assignments.firstChild) {
      list_of_assignments.removeChild(list_of_assignments.firstChild);
    }
    robot.addAssignment(assignment);
    target_field.innerText =
    `Next Coordinate: ${robot.route[0].x} (x) ${robot.route[0].y} (y)`;
    assignment = new Assignment();
  });
}

function addGoEventHandler(button) {
  go_button.addEventListener('click', e=> {
    list_of_robot_obj.forEach(robot => {
      robot.giveGreenLight();
      const current_location_field = document.querySelector(`#current-${robot.getName()}`);
      const target_location_field = document.querySelector(`#target-${robot.getName()}`)
      current_location_field.innerText =
      `Current Location: ${robot.getCurrentLocation().x} ${robot.getCurrentLocation().y}`;
      target_location_field.innerText =
      robot.route[0] ?
      `Target Location: ${robot.route[0].x} ${robot.route[0].y}` : "unknown";
    });
  });
}

const go_button = createGoButton();
addGoEventHandler(go_button);
document.querySelector('body').appendChild(go_button);
