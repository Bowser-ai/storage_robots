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

    getName()
    {
        return this.name;
    }

    go()
    {
        if (this.route.length === 0) //no route?
        {
            if (this.current_assignment > 0) //still an assignment?
            {
                this.addAssignment(current_assignment);
            } 

            else 
            {
                this.ready = true;
            }
        }

        if(!this.green_light)
        {
            const pair_current_next = new Move(
                this.getCurrentLocation(),
                this.route.shift()
            );
            //this.platform.post(this, pair_current_next);
            this.route.shift();
            this.green_light = false;
        }
    }

    signalReady()
    {
        this.ready = true;
        //platform.postReady();
    }

    giveGreenLight()
    {
        this.green_light = true;
        this.go();
    }

    getCurrentLocation()
    {
        return this.current_coord;
    }

    addAssignment(assignment)
    {
        this.ready = false;
        this.current_assignment = assignment;
        this.calculateRoute();

        //this.go();
    }

    deltaXdeltaY(p0_dimension, p1_dimension)
    {
        let compare_fn = {};

        if (p0_dimension < p1_dimension)
        {
            compare_fn = (p0_dimension, p1_dimension) => 
            {
                return p0_dimension <= p1_dimension;
            };
        }
        else
        {
            compare_fn = (p0_dimension, p1_dimension) =>
            {
                return p0_dimension >= p1_dimension
            }
        }

        return compare_fn;
    }

    calculateRoute()
    {
        const p0 = this.getCurrentLocation();
        const p1 = this.current_assignment.popFirst();

        const compX = this.deltaXdeltaY(p0.x, p1.x);
        const compY = this.deltaXdeltaY(p0.y, p1.y);

        let x = p0.x;
        let y = p0.y + 1;

        while(compX(x, p1.x))
        {
            this.route.push(new Point(x, p0.y));
            if (p0.x < p1.x) ++x;
            else             --x;
        }

        while(compY(y, p1.y))
        {
            this.route.push(new Point(p1.x, y));
            if (p0.y < p1.y) ++y;
            else             --y;
        }
    }
}
