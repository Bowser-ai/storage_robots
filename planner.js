
class Planner
{
    constructor()
    {
        let instance = null;
        //singleton construction
        if(!Planner.instance)
        {
            this.list_of_robots = [];
            this.list_of_assignments = [];
            Planner.instance = this;
        }
        else
        {
            return Planner.instance;
        }
    }

    addRobot(robot)
    {
        this.list_of_robots.push(robot);
    }

    removeRobot(name)
    {
        this.list_of_robots = this.list_of_robots.filter(
            robot => robot.getName() !== name
        );
    }

    addAssignment(assignment)
    {
        this.list_of_assignments.push(assignment);
    }

    clearAssignments()
    {
        this.list_of_assignments.splice(0, this.list_of_assignments.length);
    }

    getAssignment()
    {
      try {
        return this.list_of_assignments.shift();
      }
      catch (error)
      {
        throw new Error("planner does not have any assignments");
      }
    }

    getRobots()
    {
        return this.list_of_robots;
    }
}
