import type { JSX, ParentComponent } from "solid-js";

import styles from "./Button.module.css";

export const Button: ParentComponent<JSX.DOMAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button class={styles.button} {...props}>
    {children}
  </button>
);
