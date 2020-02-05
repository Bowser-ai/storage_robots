class Move
{
  constructor(start_point, end_point)
  {
    this.start_point = start_point;
    this.end_point = end_point;
  }

  isWaitMove()
  {
    return this.start_point.x == this.end_point.x &&
           this.start_point.y == this.end_point.y;
  }
}
