import State from "../State";
import Event from "../Event";

test("should create a new instance", () => {
  expect(new State()).toBeInstanceOf(State);
});

describe('State should manage events', () => {
  let state = new State();
  test('should add a new event', () => {
    expect(state.events.length).toBe(0)
    const event = new Event(Math.random(),new State())
    state.addEvent(event)
    expect(state.events.length).toBe(1)
    expect(state.events[0]).toBe(event)
  })

  test('should add more events', () => {
    expect(state.events.length).toBe(1)
    const event = new Event(Math.random(),new State())
    state.addEvent(event)
    expect(state.events.length).toBe(2)
    expect(state.events[1]).toBe(event)
  })

  test('should add more events', () => {
    expect(state.events.length).toBe(2)
    const event = new Event(Math.random(),new State())
    state.addEvent(event)
    expect(state.events.length).toBe(3)
    expect(state.events[2]).toBe(event)
  })

  test('should not add same event', () => {
    const sameEventInstance = state.events[1]
    const sameEventProperties = new Event(state.events[2].condition, state.events[2].next)
    expect(state.events.length).toBe(3)
    expect(() => state.addEvent(sameEventInstance)).toThrow(Error)
    expect(state.events.length).toBe(3)
    expect(() => state.addEvent(sameEventProperties)).toThrow(Error)
    expect(state.events.length).toBe(3)
  })
})

describe('constructor parameters should be optional and changed using setters', () => {
  const state = new State();
  test('name, initial state and state value should be optional', () => {
    expect(state.name).toBeUndefined
    expect(state.value).toBeUndefined
    expect(state['_finalState']).toBeUndefined
  })

  test('should be able to change value property', () => {
    expect(state.value = 'test').toBe('test')
  })

  test('isFinalState should return false if undefined', () => {
    expect(state.isFinalState()).toBeFalsy
  })
})

test('isFinalState should return true if defined as true or false if defined as false or undefined', () => {
  expect(new State(undefined, undefined, false).isFinalState()).toBeFalsy
  expect(new State(undefined, undefined, undefined).isFinalState()).toBeFalsy
  expect(new State(undefined, undefined, true).isFinalState()).toBeTruthy
})