
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
            this.platform = new Platform();
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

    go()
    {
      try {
        this.giveReadyRobotsMoreWork();
        this.list_of_robots.forEach(robot => robot.go());
      }
      catch(error)
      {
        console.log(error);
        return;
      }

    }

    giveReadyRobotsMoreWork()
    {
      try{
        const ready_robots = this.platform.getReadyRobots();
        ready_robots.forEach(robot => {
          if (ready_robots.length > 0)
          {
            robot.addAssignment(this.getAssignment());
          }
        });
      }
      catch(error)
      {
        console.log(error);
        return;
      }
    }

    addAssignment(assignment)
    {
      if (typeof assignment !== 'Assignment' && !assignment.empty())
      {
        this.list_of_assignments.push(assignment);
      }
      else {
        throw new Error("planner recieved a non-assignement");
      }
    }

    getAssignment()
    {
      if(this.list_of_assignments.length !== 0)
      {
        return this.list_of_assignments.shift();
      }
      else
        {
          throw new Error("Planner has no assignments")
        }
    }

    clearAssignments()
    {
        this.list_of_assignments.splice(0, this.list_of_assignments.length);
    }

    getRobots()
    {
        return this.list_of_robots;
    }
}
