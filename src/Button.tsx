import type { JSX, ParentComponent } from "solid-js";

import styles from "./Button.module.css";

const { button, plus, minus } = styles;

export const Button: ParentComponent<
  JSX.DOMAttributes<HTMLButtonElement> & { kind: "plus" | "minus" }
> = ({ children, kind, ...props }) => (
  <button
    classList={{
      [button]: true,
      [plus]: kind === "plus",
      [minus]: kind === "minus",
    }}
    {...props}
  >
    {children}
  </button>
);
