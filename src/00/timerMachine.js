export const initialState = "idle";

export const timerMachineConfig = {
  // ...
  initial: initialState,
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
};

export const timerMachine = (state, event) => {
  // Add the logic that will read the timerMachineConfig
  // and return the next state, given the current state
  // and event received
  const nextState =
    timerMachineConfig.states[state].on[event.type] || undefined;
  // ...

  return nextState;
};
