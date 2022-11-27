import { Component, createSignal } from "solid-js";

import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import { Button } from "./Button";
import { restoreCount, saveCount } from "./db";

const App: Component = () => {
  const [count, setCount] = createSignal(restoreCount());

  const changeCount = (delta: number): void => {
    setCount((prevValue) => saveCount(prevValue + delta));
  };

  return (
    <div class={`${styles.App} no-text-selection`}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <span>Counter</span>
      </header>
      <code class={`${styles.counter} no-text-selection`}>{count()}</code>
      <div class={styles.buttons}>
        <Button kind="minus" action={() => changeCount(-1)}>
          −
        </Button>
        <Button kind="plus" action={() => changeCount(1)}>
          +
        </Button>
      </div>
    </div>
  );
};

export default App;
