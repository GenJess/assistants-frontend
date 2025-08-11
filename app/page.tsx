"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = {
    "Basic chat": "/examples/basic-chat",
    "Function calling": "/examples/function-calling",
    "File search": "/examples/file-search",
    All: "/examples/all",
    "Aevo Copy Trader": "/aevo-copy-trader",
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Explore sample apps built with Assistants API
      </div>
      <div className={styles.container}>
        {Object.entries(categories).map(([name, url]) => (
          <a key={name} className={styles.category} href={url}>
            {name}
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;
