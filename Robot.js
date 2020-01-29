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

        this.platform = Platform.getInstance();

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
            pair_current_next = new Move(
                this.getCurrentLocation(),
                route.shift()
            );
            this.platform.post(this, pair_current_next);
            this.route.shift();
            this.green_light = false;
        }
    }

    signalReady()
    {
        this.ready = true;
        platform.postReady();
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

        this.go();
    }

    calculateRoute()
    {}






}

