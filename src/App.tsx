import { Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Button } from "./Button";

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <span>Counter</span>
      </header>
      <div class={styles.counter}>{count()}</div>
      <Button onClick={() => setCount((c) => c - 1)}>-</Button>
      <Button onClick={() => setCount((c) => c + 1)}>+</Button>
    </div>
  );
};

export default App;
