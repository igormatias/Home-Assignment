import FiniteStateMachine from "../FiniteStateMachine";
import State from "../State";
import Event from "../Event";

const state0 = new State("state 0", 0, true);
const state1 = new State("state 1", "yes", true);
const state2 = new State("state 2", false);

test("should create a new instance", () => {
  expect(
    new FiniteStateMachine([state0, state1, state2], [0, 1], state0)
  ).toBeInstanceOf(FiniteStateMachine);
});
test("expect properties to match constructor", () => {
  const fsm = new FiniteStateMachine([state0, state1, state2], [0, 1], state0);
  expect(fsm["_states"].length).toBe(3);
  expect(fsm["_states"][0]).toBe(state0);
  expect(fsm["_states"][1]).toBe(state1);
  expect(fsm["_states"][2]).toBe(state2);
  expect(fsm["_conditions"][0]).toBe(0);
  expect(fsm["_conditions"][1]).toBe(1);
  expect(fsm["_entryPoint"]).toBe(state0);
  expect(fsm["_currentState"]).toBe(state0);
});
describe("Should manage states", () => {
  const fsm = new FiniteStateMachine([state0], [], state0);
  test("should add new state", () => {
    expect(fsm["_states"].length).toBe(1);
    fsm.addState(state1);
    expect(fsm["_states"].length).toBe(2);
  });
  test("should add new state", () => {
    expect(fsm["_states"].length).toBe(2);
    fsm.addState(state2);
    expect(fsm["_states"].length).toBe(3);
  });
  test("should not add same state", () => {
    expect(fsm["_states"].length).toBe(3);
    expect(() => {
      fsm.addState(state0);
    }).toThrow(Error);
    expect(fsm["_states"].length).toBe(3);
    expect(() => {
      fsm.addState(state1);
    }).toThrow(Error);
    expect(fsm["_states"].length).toBe(3);
    expect(() => {
      fsm.addState(state2);
    }).toThrow(Error);
    expect(fsm["_states"].length).toBe(3);
  });
});

describe("Should manage State Events", () => {
  const fsm = new FiniteStateMachine(
    [state0, state1, state2, new State("state 3", undefined)],
    [0, 1, 2, 3],
    state0
  );
  test("Should accept a state event to be added", () => {
    const someEvent = new Event(2, state0);
    expect(fsm.addEventToState(state0, someEvent)).toHaveReturned;
    expect(fsm["_states"][0].events[0]).toBe(someEvent);
    const anotherEvent = new Event(0, state2);
    expect(fsm.addEventToState(state1, anotherEvent)).toHaveReturned;
    expect(fsm["_states"][1].events[0]).toBe(anotherEvent);
  });

  test("Should not accept same event to be added twice", () => {
    const sameEvent = new Event(2, state0);
    expect(() => fsm.addEventToState(state0, sameEvent)).toThrow(Error);
    const sameEvent2 = new Event(0, state2);
    expect(() => fsm.addEventToState(state1, sameEvent2)).toThrow(Error);
  });

  test("Should not accept an event with unknown condition", () => {
    expect(() => {
      fsm.addEventToState(state2, new Event(4, state0));
    }).toThrow(Error);
  });
  test("Should not accept an event with unknown state", () => {
    expect(() => {
      fsm.addEventToState(new State(), new Event(0, state0));
    }).toThrow(Error);
  });
  test("Should not accept an event with unknown state to go if triggered", () => {
    expect(() => {
      fsm.addEventToState(state2, new Event(0, new State()));
    }).toThrow(Error);
  });
});

describe("final state should return a state or undefined", () => {
  const fsm = new FiniteStateMachine([state0, state1, state2], [0, 1], state0);
  expect(state0.isFinalState()).toBeTruthy;
  expect(fsm.getFinalState()).toBe(state0);
});

describe("Should transition through events", () => {
  const fsm = new FiniteStateMachine(
    [state0, state1, state2],
    [0, 1],
    state0
  );
test("Should trigger an event at given condition", () => {
    fsm.addEventToState(state0, new Event(0, state1));
    expect(() => fsm.triggerEvent(1)).toThrow(Error);
    expect(fsm.triggerEvent(0)).toHaveReturned;
    expect(fsm.getFinalState()).toBe(state1);
  });
  test("Should reset to initial condition", () => {
      fsm.reset();
    expect(fsm.currentState).toBe(state0);
  });
});
