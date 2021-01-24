import React, { useEffect, useReducer } from "react";
import { createMachine, assign, spawn, sendParent } from "xstate";
import { useMachine, useService } from "@xstate/react";

const initialState = "inactive";

const alarmMachine = createMachine({
  initial: initialState,
  states: {
    inactive: {
      on: {
        TOGGLE: "pending",
      },
    },
    pending: {
      on: {
        SUCCESS: "active",
        TOGGLE: "inactive",
      },
    },
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
  },
});

console.log(
  "alarmMachine.transition('pending', { type: 'SUCCESS'}) :>> ",
  alarmMachine.transition("pending", { type: "SUCCESS" })
);

const alarmReducer = (state, event) => {
  const nextState = alarmMachine.transition(state, event);
  return nextState;

  // switch (state) {
  //   case "inactive":
  //     if (event.type === "TOGGLE") {
  //       return "pending";
  //     }
  //     return state;
  //   case "pending":
  //     if (event.type === "SUCCESS") {
  //       return "active";
  //     }
  //     if (event.type === "TOGGLE") {
  //       return "inactive";
  //     }
  //     return state;
  //   case "active":
  //     if (event.type === "TOGGLE") {
  //       return "inactive";
  //     }
  //     return state;

  //   default:
  //     return state;
  // }
};

export const ScratchApp = () => {
  const [state, send] = useMachine(alarmMachine);

  const status = state.value; // 'pending' 'active' 'inactive'

  useEffect(() => {
    if (status === "pending") {
      const timeout = setTimeout(() => {
        send("SUCCESS");
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [send, status]);
  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div
          className="alarmToggle"
          data-active={status === "active" || undefined}
          style={{ opacity: status === "pending" ? 0.5 : 1 }}
          onClick={() => {
            send({ type: "TOGGLE" });
          }}
        ></div>
      </div>
    </div>
  );
};
