import Event from "./Event";

class State {
  protected _events: Event[] = [];
  constructor(
    protected _name?: string,
    protected _value?: any,
    protected _finalState?: boolean
  ) {}

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  get events() {
    return this._events;
  }

  get name() {
    return this._name;
  }

  isFinalState():boolean {
    if (this._finalState)
      return this._finalState;
    return false
  }
  
  addEvent(event: Event) {
    if (
      this._events.some(
        (element: Event) =>
          element.condition === event.condition && element.next === event.next
      )
    ) {
      throw new Error(`Event already exists for the ${this._name} state`);
    }
    this._events.push(event);
  }
}

export default State;
