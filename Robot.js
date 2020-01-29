class Robot
{
    construct(name, initial_coord = new Point(0, 0))
    {
        this.platform = Platform.getInstance();
        this.planner = Planner.getInstance();
        this.signalReady();
    }
}

