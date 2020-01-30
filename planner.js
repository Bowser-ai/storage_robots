
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

    addRobot(name, initial = new Point(0, 0))
    {
        this.list_of_robots.push(new Robot(name, initial));
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

    getRobots()
    {
        return this.list_of_robots;
    }

    popAssignment()
    {
        if (this.list_of_assignments.length > 0)
        {
            return this.list_of_assignments.shift();
        }

        throw new Error(`planner::popAssignment: cannot pop empty list`);
    }
}
