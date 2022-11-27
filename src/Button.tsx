import { onMount, ParentComponent } from "solid-js";
import { createSignal } from "solid-js";

import styles from "./Button.module.css";

const { button, plus, minus, shake } = styles;

const vibrate = (duration: number) => {
  window?.navigator?.vibrate?.(duration);
};

export const Button: ParentComponent<{
  action: () => {};
  kind: "plus" | "minus";
}> = ({ children, kind, action, ...props }) => {
  let buttonRef: HTMLButtonElement | undefined;
  const [isPressed, setPressed] = createSignal(false);

  const startVibration = (event?: any) => {
    vibrate(1000000);
    setPressed(true);
  };

  const stopVibration = (event?: any) => {
    vibrate(0);
    setPressed(false);
  };

  const stopVibrationAndAct = (event?: any) => {
    if (isPressed()) {
      stopVibration();
      action();
    }
  };

  onMount(() => {
    if (buttonRef) {
      buttonRef.addEventListener("touchmove", (event) => {
        event.preventDefault();

        const { clientX, clientY } = event.touches[0];
        const element = document.elementFromPoint(clientX, clientY);

        if (element !== event.target) {
          stopVibrationAndAct();
        }
      });
    }
  });

  return (
    <button
      ref={buttonRef}
      classList={{
        [button]: true,
        [plus]: kind === "plus",
        [minus]: kind === "minus",
        [shake]: isPressed(),
        "no-text-selection": true,
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
