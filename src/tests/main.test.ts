import FiniteStateMachine from "../FiniteStateMachine";
import State from "../State";
import {
  Transition,
  testBinaryString,
  buildStateMachine,
} from "../FiniteStateMachine";

describe("Build a 2 state state machine and test it", () => {
  const state0 = new State("S0", 0, true);
  const state1 = new State("S1", 1, false);
  const transitions: Transition[] = [
    {
      state: state0,
      condition: 0,
      nextState: state0,
    },
    {
      state: state0,
      condition: 1,
      nextState: state1,
    },
    {
      state: state1,
      condition: 1,
      nextState: state1,
    },
    {
      state: state1,
      condition: 0,
      nextState: state0,
    },
  ];

  const fsm = buildStateMachine([state0, state1], [0, 1], state0, transitions);
  test("expect finite state machine to be built", () => {
    expect(fsm).toBeInstanceOf(FiniteStateMachine);
    expect(fsm.currentState).toBe(state0);
    expect(fsm.getFinalState()).toBe(state0);
    fsm.triggerEvent(0);
    expect(fsm.currentState).toBe(state0);
    fsm.triggerEvent(1);
    expect(fsm.currentState).toBe(state1);
    expect(fsm.getFinalState()).toBeUndefined
    fsm.triggerEvent(1);
    expect(fsm.currentState).toBe(state1);
    fsm.triggerEvent(0);
    expect(fsm.currentState).toBe(state0);
  });
});

describe("Build a mod-three function and test it", () => {
  beforeEach(() => {
    fsm.reset();
  })
  const state0 = new State("S0", 0, true);
  const state1 = new State("S1", 1, true);
  const state2 = new State("S2", 2, true);
  const transitions: Transition[] = [
    {
      state: state0,
      condition: 0,
      nextState: state0,
    },
    {
      state: state0,
      condition: 1,
      nextState: state1,
    },
    {
      state: state1,
      condition: 1,
      nextState: state0,
    },
    {
      state: state1,
      condition: 0,
      nextState: state2,
    },
    {
      state: state2,
      condition: 1,
      nextState: state2,
    },
    {
      state: state2,
      condition: 0,
      nextState: state1,
    },
  ];

  const fsm = buildStateMachine(
    [state0, state1, state2],
    [0, 1],
    state0,
    transitions
  );
  test("expect finite state machine to be built", () => {
    expect(fsm).toBeInstanceOf(FiniteStateMachine);
  });

  test.each([
    ["110", 0],
    ["1010", 1],
    ["1101", 1],
    ["1110", 2],
    ["1111", 0],
  ])('Mod-three machine should, given a number %i, return %i', (binaryString, expected) => {
    expect(testBinaryString(fsm, binaryString)?.value).toBe(expected);
  });


  const arrayOfModthree = new Array<number>(100).fill(0).map((_, i) => [i, i % 3])
  test.each(arrayOfModthree)('Mod-three machine, given %i, should return %i', (i, expected) => {
    expect(testBinaryString(fsm, i.toString(2))?.value).toBe(expected);
  });
});