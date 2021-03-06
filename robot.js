
const selectComperator = Symbol();
const calculateRoute = Symbol();
const getAssignmentFromPlanner = Symbol();
const signalStandInPlace = Symbol();

class Robot
{
    constructor(name, initial_coord = new Point(0, 0), grid)
    {
        this.name = name;

        this.planner = new Planner();
        this.platform = new Platform();

        this.platform.addRobot(this);

        this.current_coord = initial_coord;

        this.route = [];
        this.current_assignment = new Assignment();

        this.wait_counter = 0;
        this.green_light = false;
        this.ready = true;

        this.grid = grid;


        this.signalReady();
    }

    /*=========================================================================
     *                          PUBLIC
     *========================================================================*/

    getName()
    {
        return this.name;
    }

 /*===========================================================================*/

    go()
    {
        // no green light means the robot will posts its intensions to the
        // platform
        if(!this.green_light)
        {
            const pair_current_next = new Move(
                this.getCurrentLocation(),
                utils.first(this.route)
            );
            this.platform.postIntendedMove(this, pair_current_next);
        }
        else {
            //we have green light, pop the next coord from the route and go
            //pop the first coord of the route and update current pos
            this.current_coord = this.route.shift();

            if (this.route.length === 0) //no route?
            {
                if (this.current_assignment && !this.current_assignment.empty()) //still an assignment?
                {
                    this[calculateRoute]();
                }

                // nothing to do?? signal ready!!
                else
                {
                    this.signalReady();
                }
            }

            this.green_light = false;
        }
    }

 /*===========================================================================*/

    signalReady()
    {
        this.ready = true;
        this.platform.postReady(this);
    }

 /*===========================================================================*/

    giveGreenLight()
    {
        this.green_light = true;
        this.go();
    }

 /*===========================================================================*/

    getCurrentLocation()
    {
        return this.current_coord;
    }

 /*===========================================================================*/

    addAssignment(assignment)
    {
        this.ready = false;
        if (!this.current_assignment ||
          this.current_assignment.empty())
        {
          this.current_assignment = assignment;
          this[calculateRoute]();
        }
        else
        {
          throw new Error(`${this.getName()} already has an assignment`);
        }
    }

  /*==========================================================================*/

  wait()
  {

    this.route.unshift(this.current_coord);
    this.platform.postIntendedMove(this, new Move(this.current_coord, this.current_coord));
  }

  /*==========================================================================*/

  continue()
  {
    this.go();
  }

  /*==========================================================================*/

  deviate()
  {
    const possible_steps = this.grid.getPossibleSteps(this.current_coord);
    // pick a random number from the possibleSteps array
    const index = Math.floor(Math.random() * possible_steps.length);
    const possible_step = possible_steps[index];
    const new_assignment = new Assignment();

    // get the target coord for recalculation
    const target_coord = this.route[this.route.length - 1];

    new_assignment.addPoint(new Point(target_coord.x, target_coord.y));
    //refresh the current_assignment with the target, the current_assignment was popped
    this.current_assignment = new_assignment;

    //clear the route for recalculation
    this.route.length = 0;
    this.route.unshift(new Point(possible_step.x ,possible_step.y));
    this[calculateRoute]();
    this.go();
  }

  /*==========================================================================*/

  stop()
  {
    this.green_light = false;
  }

 /*===========================================================================*
  *                         PRIVATE
  *===========================================================================*/

    // function seletect the correct comperator, if the start coord is lower
    // than the target coord, then antother comperator has to be chosen

    [selectComperator](p0_dimension, p1_dimension)
    {
        let compare_fn = {};

        if (p0_dimension < p1_dimension)
        {
            compare_fn = (p0_dimension, p1_dimension) =>
                p0_dimension <= p1_dimension - 1;
        }
        else
        {
            compare_fn = (p0_dimension, p1_dimension) =>
                p0_dimension >= p1_dimension + 1;
        }

        return compare_fn;
    }

 /*===========================================================================*/

 [signalStandInPlace]()
 {
   this.route.push(this.current_coord);
   return;
 }

 /*===========================================================================*/

 [calculateRoute]()
 {
     const p0 = this.getCurrentLocation();
     const p1 = this.current_assignment.popFirst();

     if (p0 === p1)
     {
       return this[signalStandInPlace]();
     }

     if (!this.grid.isInGrid(p0) || !this.grid.isInGrid(p1))
     {
       throw new Error("Assignments point outside the grid");
     }

     const compX = this[selectComperator](p0.x, p1.x);
     const compY = this[selectComperator](p0.y, p1.y);

     let x = p0.x;
     let y = p0.y;

     // if the start coord is lower than the target coord, we need to
     // increase the coord every step, else we need to decrease the coord
     const increaseOrDecrease = (p0_dimension, p1_dimension, dimension) =>
     {
       if (p0_dimension < p1_dimension )
       {
        return ++dimension;
      }
       else
       {
         return --dimension;
       }
     };

     while(compX(x, p1.x))
     {
         x = increaseOrDecrease(p0.x, p1.x, x);
         this.route.push(new Point(x, p0.y));

     }

     while(compY(y, p1.y))
     {
         y = increaseOrDecrease(p0.y, p1.y, y);
         this.route.push(new Point(p1.x, y));
     }
 }

 /*===========================================================================*/
}
