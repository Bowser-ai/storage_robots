class ListOfAssignments
{
  constructor()
  {
    this.assignments = [];
  }

  addAssignment(assignment)
  {
    if (assignment instanceof Assignment)
    {
      this.assignments.push(assignment);
    }
    else
    {
      throw "Type mismatch, expected a Assignment object!";
    }
  }

  popFirstAssignment()
  {
    if (this.empty())
    {
      throw "Cannot pop from an empty list!";
    }
    else
    {
      return this.assignments.shift();
    }
  }

  clear()
  {
    this.assignments = [];
  }

  empty()
  {
    let is_empty = false;
    if (this.assignments.length === 0)
    {
      is_empty = true;
    }
    return is_empty;
  }
}
