
const LIST_OF_ROBOTS_SELECTOR = '[data-role="list-of-robots"]';
const ADD_ROBOT_BUTTON_SELECTOR = '[data-role="add-robot"]';
const CONTROL_PANELS = '[data-role="control-panels"]';
const INPUT_ROBOT_NAME_SELECTOR = '[data-role="get-robot-name"]';
const INPUT_X_COORD_INIT = '[data-role="get-x-coord"]';
const INPUT_Y_COORD_INIT = '[data-role="get-y-coord"]';

const grid = new Grid(10, 10);
const planner = new Planner();

const list_of_robots = document.querySelector(LIST_OF_ROBOTS_SELECTOR);
const add_robot_button = document.querySelector(ADD_ROBOT_BUTTON_SELECTOR);
const control_panels = document.querySelector(CONTROL_PANELS);

const list_of_assignments = document.createElement('ul');

const go_button = control_panel_ns.createGoButton();

const add_assignment_button = control_panel_ns.createAddAssignmentButton()
const send_assignment_button = control_panel_ns.createSendAssignmentButton();

const addX = control_panel_ns.createAddXYCoordAssignment('X');
const addY = control_panel_ns.createAddXYCoordAssignment('Y');

let assignment = new Assignment();

control_panel_ns.addGoEventHandler(go_button);

document.querySelector('body').appendChild(go_button);

utils.addChildrenToParent(
  control_panels,
  add_assignment_button,
  send_assignment_button,
  addX,
  addY,
  list_of_assignments
);

control_panel_ns.addAssignmentEventHandler(
  add_assignment_button,
  list_of_assignments,
  addX,
  addY,
  planner
);

control_panel_ns.addSendAssignmentEventHandler(
  send_assignment_button,
  list_of_assignments,
  planner
);

control_panel_ns.addRobotAddEventHandler(
  add_robot_button,
  planner,
  control_panels
);
