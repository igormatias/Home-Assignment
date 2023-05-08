import State from "./State";

class Event {
  constructor(protected _condition: any, protected _next: State) {}

  get condition(): any {
    return this._condition;
  }
  get next(): State {
    return this._next;
  }
  set condition(value: any) {
    this._condition = value;
  }
  set next(value: State) {
    this._next = value;
  }
}

export default Event;
