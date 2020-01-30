
const selectComperator = Symbol();

class Robot
{
    constructor(name, initial_coord = new Point(0, 0))
    {
        this.name = name;

        this.current_coord = initial_coord;

        this.route = [];
        this.current_assignment = [];

        this.wait_counter = 0;
        this.green_light = false;
        this.ready = true;

        //this.platform = Platform.getInstance();

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
        if (this.route.length === 0) //no route?
        {
            if (this.current_assignment > 0) //still an assignment?
            {
                this.addAssignment(current_assignment);
            } 

            // nothing to do?? signal ready!!
            else 
            {
                this.ready = true;
            }
        }

        // no green ligth means the robot will posts its intensions to the
        // platform
        if(!this.green_light)
        {
            const pair_current_next = new Move(
                this.getCurrentLocation(),
                Utils.first(this.route)
            );
            //this.platform.post(this, pair_current_next);
            
        }
        else {

            //we have green light, pop the next coord from the route and go
            //pop the first coord of the route and update current pos
            this.current_coord = this.route.shift();
            this.green_light = false;
        }
    }

 /*===========================================================================*/

    signalReady()
    {
        this.ready = true;
        //platform.postReady(this);
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
        this.current_assignment = assignment;
        this.calculateRoute();

        //this.go();
    }

 /*===========================================================================*/

    calculateRoute()
    {
        const p0 = this.getCurrentLocation();
        const p1 = this.current_assignment.popFirst();

        const compX = this[selectComperator](p0.x, p1.x);
        const compY = this[selectComperator](p0.y, p1.y);


        // if the start coord is lower than the target coord, we need to
        // increase the coord every step, else we need to decrease the coord
        const increaseOrDecrease = (p0_dimension, p1_dimension, dimension) =>
        {
            if (p0_dimension < p1_dimension) return ++dimension;
            else                             return --dimension;
        };

        let x = p0.x;
        let y = p0.y + 1;

        while(compX(x, p1.x))
        {
            this.route.push(new Point(x, p0.y));
            x = increaseOrDecrease(p0.x, p1.x, x);
        }

        while(compY(y, p1.y))
        {
            this.route.push(new Point(p1.x, y));
            y = increaseOrDecrease(p0.y, p1.y, y);
        }
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
                p0_dimension <= p1_dimension;
        }
        else
        {
            compare_fn = (p0_dimension, p1_dimension) => 
                p0_dimension >= p1_dimension
        }

        return compare_fn;
    }

 /*===========================================================================*/
}
