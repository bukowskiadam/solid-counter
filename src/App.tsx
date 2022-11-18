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
      <code class={styles.counter}>{count()}</code>
      <div class={styles.buttons}>
        <Button kind="minus" action={() => setCount((c) => c - 1)}>
          −
        </Button>
        <Button kind="plus" action={() => setCount((c) => c + 1)}>
          +
        </Button>
      </div>
    </div>
  );
};

export default App;
