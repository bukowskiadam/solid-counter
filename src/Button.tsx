import type { ParentComponent } from "solid-js";
import { createSignal } from "solid-js";

import styles from "./Button.module.css";

const { button, plus, minus, shake } = styles;

export const Button: ParentComponent<{
  action: () => {};
  kind: "plus" | "minus";
}> = ({ children, kind, action, ...props }) => {
  const [isPressed, setPressed] = createSignal(false);

  const startVibration = (event?: any) => {
    window.navigator.vibrate(1000000);
    setPressed(true);
  };

  const stopVibration = (event?: any) => {
    window.navigator.vibrate(0);
    setPressed(false);
  };

  const stopVibrationAndAct = (event?: any) => {
    if (isPressed()) {
      stopVibration();
      action();
    }
  };

  return (
    <button
      classList={{
        [button]: true,
        [plus]: kind === "plus",
        [minus]: kind === "minus",
        [shake]: isPressed(),
      }}
      {...props}
      onPointerDown={startVibration}
      onPointerUp={stopVibrationAndAct}
      onPointerLeave={stopVibrationAndAct}
    >
      {children}
    </button>
  );
};
