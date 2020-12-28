import Head from "next/head";
import Link from "next/link";

import { useAuth } from "@/lib/auth";

import styles from "@/styles/Home.module.css";
import { Button, Heading, Box } from "@chakra-ui/react";
import { Logo } from "@/styles/icon";

export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading className={styles.title}>Fast Feedback</Heading>
        <Logo boxSize="16em" />

        {auth.user ? (
          <Box>
            <Link href="/dashboard">
              <Button mr={3}>View Dashboard</Button>
            </Link>
            <Button onClick={(e) => auth.signout()}>Sign Out</Button>
          </Box>
        ) : (
          <Button onClick={(e) => auth.signinWithGitHub()}>Sign In</Button>
        )}
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
