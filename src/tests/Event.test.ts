import Event from "../Event";
import State from "../State";

// *missing edge and unhappy cases

test("should create a new instance", () => {
  expect(new Event(Math.random(), new State())).toBeInstanceOf(Event);
});

test("should have a condition that matches the constructor", () => {
  const condition = Math.random();
  expect(new Event(condition, new State()).condition).toBe(condition);
});

test("should have a state that matches the constructor", () => {
  const state = new State();
  expect(new Event(Math.random(), state).next).toBe(state);
});

describe("Change event properties through setters", () => {
  const startState = new State();
  const startCondition = Math.random();
  const event = new Event(startCondition, startState);

  test("should change the event trigger condition", () => {
    expect(event.condition).toBe(startCondition)
    const nextCondition = Math.random()
    expect(event.condition = nextCondition).toBe(nextCondition)
  })

  test("should change the event next state if triggered", () => {
    expect(event.next).toBe(startState)
    const nextState = new State();
    expect(event.next = nextState).toBe(nextState)
  })
});
