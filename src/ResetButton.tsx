import { onMount, ParentComponent } from "solid-js";
import { createSignal } from "solid-js";

import styles from "./ResetButton.module.css";

const { button, pressed, holdIt } = styles;

const vibrate = (pattern: number | number[]) => {
  window?.navigator?.vibrate?.(pattern);
};

export const ResetButton: ParentComponent<{
  action: () => void;
}> = ({ children, action, ...props }) => {
  let buttonRef: HTMLButtonElement | undefined;
  let timeout: ReturnType<typeof setTimeout> | null;
  const [isPressed, setPressed] = createSignal(false);

  const startReset = (event?: any) => {
    vibrate([
      250, 50, 250, 50, 250, 150, 250, 50, 250, 50, 250, 150, 250, 50, 250, 50,
      250, 150,
    ]);
    timeout = setTimeout(() => {
      abortReset();
      action();
    }, 3000);
    setPressed(true);
  };

  const abortReset = (event?: any) => {
    timeout && clearTimeout(timeout);
    timeout = null;
    vibrate(0);
    setPressed(false);
  };

  onMount(() => {
    if (buttonRef) {
      buttonRef.addEventListener("touchmove", (event) => {
        event.preventDefault();

        const { clientX, clientY } = event.touches[0];
        const element = document.elementFromPoint(clientX, clientY);

        if (element !== event.target) {
          abortReset();
        }
      });
    }
  });

  return (
    <>
      <div class={holdIt}>{isPressed() ? "Hold it!" : " "}</div>
      <button
        ref={buttonRef}
        classList={{
          [button]: true,
          [pressed]: isPressed(),
          "no-text-selection": true,
        }}
        {...props}
        onPointerDown={startReset}
        onPointerUp={abortReset}
        onPointerLeave={abortReset}
      >
        {children}
      </button>
    </>
  );
};
