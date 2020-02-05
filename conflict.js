class Conflict
{
  constructor(type)
  {
    this.type = type;
    this.intents = [];
  }

  addIntent(intent)
  {
    this.intents.push(intent);
  }
}
