import * as React from "react";
import { ReactNode } from "react";
import Head from "next/head";

interface IProps {
  children: ReactNode;
}

function layout({ children }: IProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Shadows</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex flex-col">{children}</main>

      <footer className="flex-grow-0 flex justify-center py-4 border-t border-gray-900">
        Tradition is not the worship of ashes, but keeping the flame alive.
      </footer>
    </div>
  );
}

export default layout;
