(function(global){

  let control_panel_ns = global.control_panel_ns || {};

  function createAddAssignmentButton() {
    const add_assignment_button = document.createElement('button');
    add_assignment_button.innerText = "Add Assignment";
    return add_assignment_button;
  }

  function createGoButton() {
    const go_button = document.createElement('button');
    go_button.innerText = "GO!";
    return go_button;
  }

  function createSendAssignmentButton() {
    const send_assignment_button = document.createElement('button');
    send_assignment_button.innerText = 'Send to Planner';
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

  function addAssignmentEventHandler(button, list_of_assignments, input_x, input_y) {
    button.addEventListener('click', e => {

      if (!assignment) assignment = new Assignment();

      const assignment_item = document.createElement('ul');
      assignment.addPoint(new Point(Number(input_x.value), Number(input_y.value)));
      assignment_item.innerText = `assignment-item ${input_x.value} ${input_y.value}`;
      list_of_assignments.appendChild(assignment_item);
    });
  }

  function addSendAssignmentEventHandler(button,list_of_assignments, planner) {
    button.addEventListener('click', e => {

      while(list_of_assignments.firstChild) {
        list_of_assignments.removeChild(list_of_assignments.firstChild);
      }
      planner.addAssignment(assignment);
      planner.getRobots().forEach(robot => {
        const target_field = document.getElementById(`target-${robot.getName()}`);
        target_field.innerText =
          `Next Coordinate: assignment recieved!`;
      });
    });
  }

  function addRobotAddEventHandler(button, planner, control_panels){
    add_robot_button.addEventListener('click', e => {
      const robot_list_element = document.createElement('li');
      const robot_name = document.querySelector(INPUT_ROBOT_NAME_SELECTOR).value;
      const init_coord_x = Number(document.querySelector(INPUT_X_COORD_INIT).value);
      const init_coord_y = Number(document.querySelector(INPUT_Y_COORD_INIT).value);
      const robot = new Robot(robot_name, new Point(init_coord_x, init_coord_y), grid);

      const name = document.createElement('h1');
      const control_panel = document.createElement('div');

      const target_field = control_panel_ns.createCurrentTargetField(robot);
      const location_field = control_panel_ns.createCurrentLocationField(robot);

      planner.addRobot(robot);

      robot_list_element.innerText = `${robot_name}`;
      list_of_robots.appendChild(robot_list_element);

      name.innerText = robot.getName();

      utils.addChildrenToParent(control_panel, location_field, target_field);
      utils.addChildrenToParent(control_panels, name, control_panel);

    });

  }

  function addGoEventHandler(button) {
    go_button.addEventListener('click', e => {
      planner.go();
      planner.getRobots().forEach(robot => {
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

  control_panel_ns.createAddAssignmentButton = createAddAssignmentButton;
  control_panel_ns.createAddXYCoordAssignment = createAddXYCoordAssignment;
  control_panel_ns.addGoEventHandler = addGoEventHandler;
  control_panel_ns.createSendAssignmentButton = createSendAssignmentButton;
  control_panel_ns.addSendAssignmentEventHandler = addSendAssignmentEventHandler;
  control_panel_ns.addAssignmentEventHandler = addAssignmentEventHandler;
  control_panel_ns.createCurrentLocationField = createCurrentLocationField;
  control_panel_ns.createCurrentTargetField = createCurrentTargetField;
  control_panel_ns.createGoButton = createGoButton;
  control_panel_ns.addRobotAddEventHandler = addRobotAddEventHandler;

  global.control_panel_ns = control_panel_ns;
}(window));
