import Head from "next/head";
import Link from "next/link";

import { useAuth } from "@/lib/auth";

// import styles from "@/styles/Home.module.css";
import { Button, Heading, Box, Stack, Center } from "@chakra-ui/react";
import { Logo } from "@/styles/icon";

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <Center height="100vh">
        <Stack>
          <Center>
            <Heading>Fast Feedback</Heading>
          </Center>
          <Center>
            <Logo boxSize="14em" />
          </Center>
          <Center>
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
          </Center>
        </Stack>
      </Center>
    </>
  );
}
