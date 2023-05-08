import State from "./State";
import Event from "./Event";

type Transition = {
  state: State;
  condition: number;
  nextState: State;
};

class FiniteStateMachine {
  private _states: State[];
  private _entryPoint: State;
  private _conditions: any[];
  private _currentState: State;

  constructor(states: State[], conditions: any[], entryPoint: State) {
    this._states = [...states];
    this._conditions = [...conditions];
    if (this._states.indexOf(entryPoint) === -1) {
      throw new Error("Entry point not found in valid states");
    }
    this._entryPoint = entryPoint;
    this._currentState = this._entryPoint;
  }

  get conditions() {
    return this._conditions;
  }
  get currentState() {
    return this._currentState;
  }

  addState = (state: State): void => {
    // * Check if not the same object, but doesn't check for two different objects containing the same values
    if (this._states.indexOf(state) >= 0) {
      throw new Error(`State ${state.name} is already added.`);
    }
    this._states.push(state);
  };

  addEventToState = (state: State, event: Event): void => {
    if (this._states.indexOf(state) === -1) {
      throw new Error(`This state ${state.name} is a unknown state`);
    }
    if (this._conditions.indexOf(event.condition) === -1) {
      throw new Error(
        `The condition ${event.condition} in the event is unknown`
      );
    }
    if (this._states.indexOf(event.next) === -1) {
      throw new Error(
        `The next state ${event.next.name} in the event is unknown`
      );
    }
    state.addEvent(event);
  };
  triggerEvent = (condition: number): void => {
    const event = this._currentState.events.find((element) => {
      if (element.condition == condition) {
        return true;
      }
      return false;
    });
    if (!event) {
      throw new Error(
        `Condition ${condition} doesn't trigger an event at current state ${this.currentState.name}`
      );
    }
    this._currentState = event.next;
  };
  getFinalState = (): State | undefined => {
    if (this._currentState.isFinalState()) {
      return this._currentState;
    }
    return undefined;
  };
  reset = (): void => {
    this._currentState = this._entryPoint;
  }
}

const buildStateMachine = (
  states: State[],
  eventConditions: any[],
  initialState: State,
  transitions: Transition[]
): FiniteStateMachine => {
  const fsm = new FiniteStateMachine(states, eventConditions, initialState);
  transitions.forEach((transition) => {
    fsm.addEventToState(
      transition.state,
      new Event(transition.condition, transition.nextState)
    );
  });
  return fsm;
};

const testBinaryString = (
  fsm: FiniteStateMachine,
  word: string
): State | undefined => {
  [...word].forEach((char) => {
    const condition = +char;
    if (condition === Number.NaN) {
      throw new Error("Not a number");
    }
    fsm.triggerEvent(condition);
  });

  return fsm.getFinalState();
};

export default FiniteStateMachine;
export { Transition, testBinaryString, buildStateMachine };
