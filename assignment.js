class Assignment
{
  constructor()
  {
    this.points = [];
  }

  addPoint(point)
  {

    if (point instanceof Point)
    {
      this.points.push(point);
    }
    else
    {
      throw "Type mismatch, expected a Point object!";
    }
  }

  insertBeforeHomePoint(point)
  {
    if (this.empty())
    {
      this.addPoint(point);
    }
    else if (point instanceof Point)
    {
      const home = this.points.pop();
      this.addPoint(point);
      this.addPoint(home);
    }
    else
    {
      throw "Type mismatch, expected a Point object!";
    }
  }

  popFirst()
  {
    if (this.empty())
    {
      throw "Cannot pop from an empty list!";
    }
    else
    {
      return this.points.shift();
    }
  }

  empty()
  {
    let is_empty = false;
    if (this.points.length === 0)
    {
      is_empty = true;
    }
    return is_empty;
  }
}
