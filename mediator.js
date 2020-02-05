class Mediator
{
  constructor(conflict)
  {
    this.conflict = conflict;
  }

  resolve()
  {
    switch (this.conflict.type) {
      case 1:
        this.resolveType1();
        break;
      case 2:
        this.resolveType2();
        break;
      default:
        throw "Unknown conflict type!"
        break;
    }
  }

  resolveType1()
  {
    let continuing_robot = this.robotWaiting();
    if (continuing_robot == undefined)
    {
      continuing_robot = this.robotWithPriority();
    }
    continuing_robot.continue();
    this.setOthersToWait(continuing_robot);
  }

  resolveType2()
  {
    let continuing_robot = this.robotWithPriority();
    continuing_robot.continue();
    this.setOthersToDeviate(continuing_robot);
  }

  robotWaiting()
  {
    let robot = undefined;

    const find_wait_move = (intent) =>
    {
      return intent.move.isWaitMove();
    }
    const intent = this.conflict.intents.find(find_wait_move);
    if (intent != undefined)
    {
      robot = intent.robot;
    }

    return robot;
  }

  robotWithPriority()
  {
    let priority_robot = this.conflict.intents[0].robot;

    for (let i = 1; i < this.conflict.intents.length; i++)
    {
      if (priority_robot.wait_counter <
          this.conflict.intents[i].robot.wait_counter)
        priority_robot = this.conflict.intents[i].robot;
    }

    return priority_robot;
  }

  setOthersToWait(continuing_robot)
  {
    const set_to_wait = (intent) =>
    {
      if (intent.robot != continuing_robot)
      {
        intent.robot.wait();
      }
    }
    this.conflict.intents.forEach(set_to_wait);
  }

  setOthersToDeviate(continuing_robot)
  {
    const set_to_deviate = (intent) =>
    {
      if (intent.robot != continuing_robot)
      {
        intent.robot.deviate();
      }
    }
    this.conflict.intents.forEach(set_to_deviate);
  }
}
