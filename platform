class Platform
{
    constructor()
    {
      if (!!Platform.instance)
      {
        return Platform.instance;
      }
      else
      {
        Platform.instance = this;

        this.robots = [];
        this.intents = [];
        this.ready_robots = [];

        return this;
      }
    }

    addRobot(robot)
    {
      this.validateRobot(robot);
      this.robots.push(robot);
    }

    removeRobot(robot)
    {
      this.validateRobot(robot);

      let r;
      for (let i = 0; i < this.robots.length; i++)
      {
        r = this.robots.shift();
        if (r !== robot)
        {
          this.robots.push(r);
        }
      }
    }

    postIntendedMove(robot, move)
    {
      this.validateRobot(robot);
      this.validateMove(move);

      if (!this.robotHasAlreadyPosted(robot))
      {
        this.intents.push(new Intent(robot,move));
      }

      if (this.movesComplete())
      {
        this.handlePosts();
      }
    }

    handlePosts()
    {
      const conflicts = this.findConflicts();

      if (conflicts.length != 0)
      {
        this.removeConflictsFromIntents(conflicts);
        this.resolveConflicts(conflicts);
      }
      else
      {
        this.broadcastGreenLight();
      }
    }

    movesComplete()
    {
      return this.robots.length === this.intents.length;
    }

    findConflicts()
    {
      let conflicts = [];
      let type = 0;
      let conflicting_intent;

      const find_conflicts = (intent) =>
      {
        if (!this.intentInConflicts(intent, conflicts))
        {
          conflicting_intent = this.findConflictType1(intent);

          if (conflicting_intent !== undefined)
          {
            type = 1;
          }
          else
          {
            conflicting_intent = this.findConflictType2(intent);

            if (conflicting_intent !== undefined)
            {
              type = 2;
            }
          }

          if (conflicting_intent !== undefined)
          {
            conflicts.push(this.createNewConflict(type, intent, conflicting_intent));
          }
        }
      }

      this.intents.forEach(find_conflicts);
      return conflicts;
    }

    findConflictType1(intent)
    {
      const find_conflict_type1 = (element) =>
      {
        return element !== intent &&
               element.move.end_point.x === intent.move.end_point.x &&
               element.move.end_point.y === intent.move.end_point.y;
      }

      return this.intents.find(find_conflict_type1);
    }

    findConflictType2(intent)
    {
      const find_conflict_type2 = (element) =>
      {
        return element !== intent &&
               element.move.end_point.x === intent.move.start_point.x &&
               element.move.end_point.y === intent.move.start_point.y &&
               element.move.start_point.x === intent.move.end_point.x &&
               element.move.start_point.y === intent.move.end_point.y;
      }

      return this.intents.find(find_conflict_type2);
    }

    createNewConflict(type, intent, conflicting_intent)
    {
      const conflict = new Conflict(type);
      conflict.addIntent(intent);
      conflict.addIntent(conflicting_intent);

      return conflict;
    }

    intentInConflicts(intent, conflicts)
    {
      let in_conflict = false;

      const in_conflicts = (conflict) =>
      {
        const in_intents = (element) =>
        {
          return element === intent;
        }
        return conflict.intents.some(in_intents);
      }
      in_conflict = conflicts.some(in_conflicts);

      return in_conflict;
    }

    removeConflictsFromIntents(conflicts)
    {
      const search_conflicts = (conflict) =>
      {
        const remove_intent = (intent) =>
        {
          this.removeIntentFromIntents(intent);
        }
        conflict.intents.forEach(remove_intent);
      }
      conflicts.forEach(search_conflicts);
    }

    removeIntentFromIntents(intent_to_remove)
    {
      const end = this.intents.length;

      for (let i = 0; i < end; i++)
      {
        const intent = this.intents.shift();

        if (intent.robot != intent_to_remove.robot)
        {
          this.intents.push(intent);
        }
      }
    }

    resolveConflicts(conflicts)
    {
      const resolve = (conflict) =>
      {
        const mediator = new Mediator(conflict);
        mediator.resolve();
      }
      conflicts.forEach(resolve);
    }

    broadcastGreenLight()
    {
      this.intents = [];

      const green_light = (element) =>
      {
        element.giveGreenLight();
      }
      this.robots.forEach(green_light);
    }

    postReady(robot)
    {
      this.validateRobot(robot);
      this.ready_robots.push(robot);
    }

    getReadyRobots()
    {
      const list_of_robots = this.ready_robots;
      this.ready_robots = [];

      return list_of_robots;
    }

    robotHasAlreadyPosted(robot)
    {
      const find_robot = (element) =>
      {
        return element.robot == robot
      }

      return this.intents.some(find_robot);
    }

    validateRobot(robot)
    {
      if (!(robot instanceof Robot))
      {
        throw "Type mismatch, expected a Robot object!";
      }
    }

    validateMove(move)
    {
      if (!(move instanceof Move))
      {
        throw "Type mismatch, expected a Move object!";
      }
    }
}
