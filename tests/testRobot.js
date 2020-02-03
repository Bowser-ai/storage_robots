
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

function createAddAssignmentButton(robot_name) {
  const add_assignment_button = document.createElement('button');
  add_assignment_button.innerText = "Add Assignment";
  add_assignment_button.id = robot_name;
  return add_assignment_button;
}

function createCurrentLocationField(robot) {
  const current_location_field = document.createElement('p');
  current_location_field.id = robot.getName();
  current_location_field.innerText =
  `${robot.getCurrentLocation.x}  ${robot.getCurrentLocation.y}`;
  return current_location_field;
}

function createCurrentAssignmentfield(robot) {
  const current_assignment_field = document.createElement('p');
  current_assignment_field.id = robot.getName();
  const current_assignment = robot.current_assignment;
  current_assignment_field.innerText =
  `current_assignment: ${current_assignment.x}, ${current_assignment.y}`;

  return current_assignment_field;
}

function createAddXYCoordAssignment(x) {
  const addXAssignment = document.createElement('input');
  addXAssignment.setAttribute('type', 'number');
  addXAssignment.setAttribute('placeholder', `Enter ${x} Coord....`);
  return addXAssignment;
}

function alterCurrentPosition() {
  current_position.setAttribute('value',
        `current_loc(x, y):   ${robot.getCurrentLocation().x},      ${robot.getCurrentLocation().y}`);
      }

function calculateRouteTest(robot) {
  robot.route.forEach((element) => {
      const li = document.createElement('li');
      p.innerText = `Route generated for ${robot.getName()} :`;
      li.innerText = element.x + ' ' + element.y;
      ul.appendChild(li);
  });
}

add_robot_button.addEventListener('click', e => {
  const robot_list_element = document.createElement('li');
  const robot_name = document.querySelector(INPUT_ROBOT_NAME_SELECTOR).value;
  const init_coord_x = document.querySelector(INPUT_X_COORD_INIT).value;
  const init_coord_y = document.querySelector(INPUT_Y_COORD_INIT).value;

  const robot = new Robot(robot_name, new Point(init_coord_x, init_coord_y), grid);

  list_of_robot_obj.push(robot);

  robot_list_element.innerText = `${robot_name}`;
  list_of_robots.appendChild(robot_list_element);

  const control_panel = document.createElement('div');
  const assignment_button = createAddAssignmentButton(robot_name);
  const addX = createAddXYCoordAssignment('X');
  const addY = createAddXYCoordAssignment('Y');
  const assignment_field = createCurrentAssignmentfield(robot);
  control_panel.appendChild(assignment_field);
  control_panel.appendChild(assignment_button);
  control_panel.appendChild(addX);
  control_panel.appendChild(addY);
  control_panels.appendChild(control_panel);
});

//button.addEventListener('click', e => {
  //const assignment = new Assignment();
  //assignment.addPoint(new Point(Number(inputX.value), Number(inputY.value)));
  //robot.addAssignment(assignment);
//});

//go_button.addEventListener('click', e=> {
  //robot.giveGreenLight();
  //alterCurrentPosition();

//})

//route_button.addEventListener('click', calculateRouteTest);

//alterCurrentPosition();

//div[0].appendChild(p);
//div[0].appendChild(ul);
//div[0].appendChild(current_position);
//div[0].appendChild(inputX);
//div[0].appendChild(inputY);
//div[0].appendChild(button);
//div[0].appendChild(route_button);
//
