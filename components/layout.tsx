import * as React from "react";
import { ReactNode } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";

interface IProps {
  children: ReactNode;
}

function layout({ children }: IProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shadows</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Tradition is not the worship of ashes, but keeping the flame alive.
      </footer>
    </div>
  );
}

export default layout;
