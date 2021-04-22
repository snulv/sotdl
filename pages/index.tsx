import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts,
    },
  };
};

interface HomeProps {
  posts: Post;
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Make yourself a ninja
        {JSON.stringify(posts)}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
